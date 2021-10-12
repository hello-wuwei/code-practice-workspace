## webpack-vue
my mpa-vue-cli

## node版本
v12.13.0

## 详情
该项目通过webpack自定义配置vue多页面项目，动态配置打包入口，根据命令参数打包对应项目

自定义eslint检测项目

用于短周期性简单项目快速开发，如活动小项目等，实现一套框架方案，开发多个项目，融合了多页面配置
打包时配合命令参数，独立打包单独的项目，生成打包文件（例：npm run build:test --name=page_1）

## 关于html中font-size的设置
font-size根据实际window尺寸换算（根据等比相似换算原则）
```

        设计图局部尺寸                       设计图总宽度尺寸               
--------------------------------  =  -------------------------
  html-font-size * 实际局部rem值            屏幕宽度实际尺寸

即 

        1               设计图局部尺寸            设计图总宽度尺寸               
-----------------  *  ----------------  =  ------------------------
  html-font-size        实际局部rem值            屏幕宽度实际尺寸

即

        1                           设计图总宽度尺寸               
-----------------  *  换算倍率  =  ------------------
  html-font-size                    屏幕宽度实际尺寸

推导出

                     屏幕宽度实际尺寸 * 换算倍率        100vw * 自定义换算倍率    
html-font-size  =  ---------------------------  =  ----------------------
                          设计图总宽度尺寸             实际项目设计图总宽度尺寸
```