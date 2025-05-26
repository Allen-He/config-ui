#!/bin/bash

# 定义函数获取版本号
get_version() {
    # 假设版本号存储在 package.json 文件中，通过 jq 工具解析
    if command -v jq &> /dev/null; then
        version=$(jq -r '.version' package.json)
        if [ -z "$version" ]; then
            echo "无法从 package.json 中获取版本号，请检查文件是否存在或格式是否正确。"
            exit 1
        fi
    else
        echo "jq 工具未安装，请先安装 jq。"
        exit 1
    fi
    echo "$version"
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

# 获取版本号
version=$(get_version)

# 执行 pnpm build
echo "执行 pnpm build..."
pnpm build

# 执行 pnpm changeset
echo "执行 pnpm changeset..."
pnpm changeset

# 检查命令是否成功
if [ $? -ne 0 ]; then
    echo "pnpm changeset 执行失败，脚本终止。"
    exit 1
fi

# 执行 pnpm changeset version
echo "执行 pnpm changeset version..."
pnpm changeset version

# 检查命令是否成功
if [ $? -ne 0 ]; then
    echo "pnpm changeset version 执行失败，脚本终止。"
    exit 1
fi

# 获取版本变更信息
changes=$(get_changed_versions)

if [ -z "$changes" ]; then
    echo "没有检测到版本变更，使用默认的提交信息。"
    commit_msg="release: version bump"
else
    commit_msg="release: ${changes}"
fi

# 执行 git add
echo "执行 git add..."
git add .

# 检查命令是否成功
if [ $? -ne 0 ]; then
    echo "git add 执行失败，脚本终止。"
    exit 1
fi

# 执行 git commit
echo "执行 git commit -m '${commit_msg}'..."
git commit -m "${commit_msg}"

# 检查命令是否成功
if [ $? -ne 0 ]; then
    echo "git commit 执行失败，脚本终止。"
    exit 1
fi

# 执行 pnpm changeset publish
echo "执行 pnpm changeset publish..."
pnpm changeset publish

# 检查命令是否成功
if [ $? -ne 0 ]; then
    echo "pnpm changeset publish 执行失败，脚本终止。"
    exit 1
fi

echo "所有步骤执行完成！"
