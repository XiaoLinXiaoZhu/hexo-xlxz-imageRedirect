### 功能介绍

#### 基础功能

本插件可以将 obsidian 或者其他软件中使用 wiki引用模式[^1] 转化为 markdown引用，从一个统一的文件夹里面读取图片。

>hexo本身支持的通过assess_img 标签引用方式并不美观，并不能正常在obsidian中展示图片
>
>即使通过插件 hexo-assess-img 修正，也需要在post文件夹下新建十分多的文件夹，当post过多时不便于管理，而且也十分不美观
>
>同时，使用本插件可以配合obsidian自动保存pasted_img(粘贴的图片时自动在本地保存图片)，将图片同步到hexo中，且能够正常显示。

[1]: 即 使用 `![[filename]]` 展示引用，而不是markdown默认引用 `![file_display_name](filepath)`

#### 进阶功能

下面是一些进阶的功能以及使用案例：

##### tag索引

使用`[[___tagname]]` 创建索引到对应tag页面的链接，例如：
注意，后括号后面一定要是换行，在渲染的时候才会被正常识别（为了避免冲突）


```
[[___hexo]] 
```
[[___hexo]]

##### 侧边图片

使用`![[imgname]]side`来创建
```
![[imgname]]side
```

![[next.png]]side
测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字

##### 指定宽度的侧边图片

使用`![[imgname]]side111`来创建
```
![[imgname]]side200
```

![[next.png]]side200
测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字

##### 在下方显示图片名称

使用`![[imgname]]name`来创建（好像有一点点问题）
```
![[imgname]]name
```

![[next.png]]name



### 安装方式

1. 将release中的压缩包解压到 `hexo根目录\node_modules` 下 
2. 在hexo根目录下打开 `_config.yml` ，修改如下：

```
render_drafts: false
post_asset_folder: true  #将这个改为true
marked:
  prependRoot: true
  postAsset: true
```

3. 在你的`_post`文件夹里面新建一个`3.Source`文件夹和一个名为`3.Source.md`的markdowm文件（这样的话构建hexo时会将3.Source文件夹一并上传）
4. 在hexo根目录打开git bash，输入以下代码，重新构建hexo：

```git
$ hexo clear
$ hexo g
$ hexo d
$ hexo s
```

### 注意事项

1. 不可以删除 `3.Source.md` 不然，文件夹将不会被生成在hexo里面
2. 尽量不要使用npm更改包列表，因为本插件没有上传npm，所以说在更新包的时候会被删除。
3. 在使用obsidian构建笔记系统的时候，将图片默认保存位置改为`3.Source`文件夹，这样的话，就可以支持






<!-- more -->

----
### Reference
