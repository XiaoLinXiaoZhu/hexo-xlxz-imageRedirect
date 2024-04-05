'use strict';
var cheerio = require('cheerio');

//图片的src路径应该改为：/2024/03/01/3.Source/图片名称
// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
// 这是一个寻找特定字符串片段‘m’在‘str’中饭第 i 次出现的起始位置的函数

function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

hexo.extend.filter.register('before_post_render', function(data) {

  // 正则表达式匹配文章内容并替换 图片 匹配项
  data.content =data.content.replace(/\!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]side([0-9]+)/g, '<img src="/2024/03/01/3.Source/$1.$2" alt="$1.$2" align="right" width="$3">');
  data.content =data.content.replace(/\!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]side/g, '<img src="/2024/03/01/3.Source/$1.$2" alt="$1.$2" align="right" width="450">');
  data.content =data.content.replace(/\!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]name/g, '![$1](/2024/03/01/3.Source/$1.$2)');
  data.content =data.content.replace(/\!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]/g, '![](/2024/03/01/3.Source/$1.$2)');

  // 正则表达式匹配文章链接
  data.content =data.content.replace(/\[\[___(.*?)\]\]\n\#/g, '<a href="/tags/$1/" rel="contents" data-pjax-state=""># $1</a> <br>\n#');
  data.content =data.content.replace(/\[\[___(.*?)\]\]\n/g, '<a href="/tags/$1/" rel="contents" data-pjax-state=""># $1</a> <br>');
    // 这里可以根据需要进行转换逻辑，例如：
    // 将 access_path 替换为一个完整的URL或者其他的HTML结构
  //console.info&&console.info("replaced" + data.permalink);
});

hexo.extend.filter.register('after_post_render', function(data){
  var config = hexo.config;
  var link = data.permalink;
  var linkPrefix = '/2024/03/01/3.Source/';

  var toprocess = ['excerpt', 'more', 'content'];
  for(var i = 0; i < toprocess.length; i++){
    var key = toprocess[i];

    var $ = cheerio.load(data[key], {
      ignoreWhitespace: false,
      xmlMode: false,
      lowerCaseTags: false,
      decodeEntities: false
    });

    $('img').each(function(){
      if ($(this).attr('src')){
        hexo.log.info("in file" + link);
        // For windows style path, we replace '\' to '/'.
        var src = $(this).attr('src').replace('\\', '/');
        //console.info&&console.info("sourcelink :"  +src);
        if(!(/http[s]*.*|\/\/.*/.test(src)
          || /^\s+\//.test(src)
          || /^\s*\/uploads|images\//.test(src))) {
          // For "about" page, the first part of "src" can't be removed.
          // In addition, to support multi-level local directory.

          var srcArray = src.split('/').filter(function(elem){
            return elem != '' && elem != '.';
          });

          $(this).attr('src', linkPrefix + srcArray[srcArray.length -1]);
          //console.info&&console.info("original link as:-->"+ src);
          console.info&&console.info("update link as:-->"+ linkPrefix + srcArray[srcArray.length -1]);
        }
      }else{
        console.info&&console.info("no src attr, skipped...");
        console.info&&console.info($(this));
      }
    });
    data[key] = $.html();
  }

});
