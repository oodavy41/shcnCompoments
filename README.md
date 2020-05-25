# 长宁自定义组件仓库

非`visdata`打头为组件文件夹

外部`package.json`为`yarn`的`workspace`配置，用于共享`npm`依赖

`worksapce`内字段与单个组件的`package.json`的`name`字段对应

使用 `visCompTemplateCli` 在根目录创建组件项目，添加 `-w` 选项将自动配置`workspace`