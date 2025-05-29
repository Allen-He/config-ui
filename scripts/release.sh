#!/bin/bash

# 定义颜色变量
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# 通用打印格式化函数
print_format() {
    local color=$1
    local symbol=$2
    local message=$3
    echo
    echo -e "${color}${BOLD}${symbol} ${message} ${NC}"
    echo -e "${color}${BOLD}$(printf '%.s─' $(seq 1 50))${NC}"
}

# 步骤信息
print_step() {
    print_format "${BLUE}" "▣" "$1"
}

# 成功信息
print_success() {
    print_format "${GREEN}" "✓" "$1"
}

# 错误信息
print_error() {
    print_format "${RED}" "✕" "$1"
}

# 普通信息
print_info() {
    print_format "${YELLOW}" "○" "$1"
}

# 定义函数获取所有子包的版本变更信息
get_changed_versions() {
    local changes=""
    
    # 遍历 packages 目录下的所有子包
    for dir in packages/*/; do
        # 获取包名（从 package.json）
        if [ -f "${dir}package.json" ]; then
            local pkg_name=$(jq -r '.name' "${dir}package.json")
            
            # 检查包是否在忽略列表中
            if is_package_ignored "$pkg_name"; then
                continue
            fi
            
            local new_version=$(jq -r '.version' "${dir}package.json")
            local old_version=$(git show HEAD:${dir}package.json 2>/dev/null | jq -r '.version')
            
            # 如果版本发生变化，添加到变更列表
            if [ "$new_version" != "$old_version" ]; then
                if [ -n "$changes" ]; then
                    changes="${changes}; "
                fi
                changes="${changes}${pkg_name}@${new_version}"
            fi
        fi
    done
    
    echo "$changes"
}

# 获取 changeset 配置中的 ignore 列表
get_ignored_packages() {
    if [ -f ".changeset/config.json" ]; then
        echo $(jq -r '.ignore[]' ".changeset/config.json" 2>/dev/null)
    fi
}

# 检查包是否在忽略列表中
is_package_ignored() {
    local pkg_name="$1"
    local ignored_packages=($(get_ignored_packages))
    
    for ignored in "${ignored_packages[@]}"; do
        if [ "$pkg_name" = "$ignored" ]; then
            return 0 # true
        fi
    done
    return 1 # false
}

# 获取最新版本号
get_latest_version() {
    local latest_version=""
    # 从第一个非忽略的包的 package.json 获取版本号
    for dir in packages/*/; do
        if [ -f "${dir}package.json" ]; then
            local pkg_name=$(jq -r '.name' "${dir}package.json")
            if ! is_package_ignored "$pkg_name"; then
                latest_version=$(jq -r '.version' "${dir}package.json")
                break
            fi
        fi
    done
    
    echo "v$latest_version"
}

# 执行 pnpm changeset
print_step "执行 changeset"
pnpm changeset

# 检查命令是否成功
if [ $? -ne 0 ]; then
    print_error "pnpm changeset 执行失败，脚本终止"
    exit 1
fi

# 执行 pnpm changeset version
print_step "更新版本号"
pnpm changeset version

# 检查命令是否成功
if [ $? -ne 0 ]; then
    print_error "pnpm changeset version 执行失败，脚本终止"
    exit 1
fi

# 获取版本变更信息
changes=$(get_changed_versions)

if [ -z "$changes" ]; then
    print_info "没有检测到版本变更，使用默认的提交信息"
    commit_msg="release: version bump"
else
    print_info "检测到以下包的版本变更:"
    echo -e "${YELLOW}${changes}${NC}"
    commit_msg="release: ${changes}"
fi

# 执行 git add
print_step "暂存更改"
git add .

# 检查命令是否成功
if [ $? -ne 0 ]; then
    print_error "git add 执行失败，脚本终止"
    exit 1
fi

# 执行 git commit
print_step "提交更改"
print_info "提交信息: ${commit_msg}"
git commit -m "${commit_msg}"

# 检查命令是否成功
if [ $? -ne 0 ]; then
    print_error "git commit 执行失败，脚本终止"
    exit 1
fi

# 执行 pnpm build
print_step "开始构建项目"
pnpm build
print_success "构建完成"

# 执行 pnpm changeset publish --no-git-tag
print_step "发布包"
pnpm changeset publish --no-git-tag

# 检查命令是否成功
if [ $? -ne 0 ]; then
    print_error "pnpm changeset publish --no-git-tag 执行失败，脚本终止"
    exit 1
fi

# 推送到远程仓库
print_step "推送到远程仓库"
git push origin HEAD

# 检查命令是否成功
if [ $? -ne 0 ]; then
    print_error "git push 执行失败，脚本终止"
    exit 1
fi

# 获取最新版本的 tag
latest_tag=$(get_latest_version)

# 创建并推送 tag
print_step "创建并推送 tag ${latest_tag}"
# 先创建本地 tag
git tag -a "${latest_tag}" -m "${commit_msg}"
# 推送 tag 到远程
git push origin "${latest_tag}"

# 检查命令是否成功
if [ $? -ne 0 ]; then
    print_error "推送 tag 失败，脚本终止"
    exit 1
fi

print_success "🎉 所有步骤执行完成！"
