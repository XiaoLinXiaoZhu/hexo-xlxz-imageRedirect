'use strict';
var cheerio = require('cheerio');

//ͼƬ��src·��Ӧ�ø�Ϊ��/2024/03/01/3.Source/ͼƬ����
// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
// ����һ��Ѱ���ض��ַ���Ƭ�Ρ�m���ڡ�str���з��� i �γ��ֵ���ʼλ�õĺ���

function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

hexo.extend.filter.register('before_post_render', function(data) {

  // ������ʽƥ���������ݲ��滻 ͼƬ ƥ����
  data.content =data.content.replace(/\!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]side([0-9]+)/g, '<img src="/2024/03/01/3.Source/$1.$2" align="right" width="$3">');
  data.content =data.content.replace(/\!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]side/g, '<img src="/2024/03/01/3.Source/$1.$2" align="right" width="450">');
  data.content =data.content.replace(/\!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]name/g, '![$1](/2024/03/01/3.Source/$1.$2)');
  data.content =data.content.replace(/\!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]/g, '![](/2024/03/01/3.Source/$1.$2)');

  // ������ʽƥ����������
  data.content =data.content.replace(/\[\[___(.*?)\]\]\n/g, '<a href="/tags/$1/" rel="contents" data-pjax-state=""># $1</a> <br>');
    // ������Ը�����Ҫ����ת���߼������磺
    // �� access_path �滻Ϊһ��������URL����������HTML�ṹ
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
