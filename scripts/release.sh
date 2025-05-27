#!/bin/bash

# 定义颜色变量
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# 定义输出函数
print_step() {
    echo
    echo -e "${BLUE}${BOLD}▣ ${1} ${NC}"
    echo -e "${BLUE}${BOLD}$(printf '%.s─' $(seq 1 50))${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_error() {
    echo
    echo -e "${RED}✕ ${1}${NC}"
    echo -e "${RED}$(printf '%.s─' $(seq 1 30))${NC}"
}

print_info() {
    echo -e "${YELLOW}○ ${1}${NC}"
}

# 定义函数获取所有子包的版本变更信息
get_changed_versions() {
    local changes=""
    
    # 遍历 packages 目录下的所有子包（除了 docs）
    for dir in packages/*/; do
        # 跳过 docs 目录
        if [[ "$dir" == "packages/docs/" ]]; then
            continue
        fi
        
        # 获取包名（从 package.json）
        if [ -f "${dir}package.json" ]; then
            local pkg_name=$(jq -r '.name' "${dir}package.json")
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

# 执行 pnpm changeset publish
print_step "发布包"
pnpm changeset publish

# 检查命令是否成功
if [ $? -ne 0 ]; then
    print_error "pnpm changeset publish 执行失败，脚本终止"
    exit 1
fi

print_success "🎉 所有步骤执行完成！"
