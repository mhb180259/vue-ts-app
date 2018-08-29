
function imgFormat(url:string, params:string) {
  if (!url) return '';
  let v:any = {
    min: 'resize,h_40,w_40',
    small: 'resize,h_120,w_120',
    middle: 'resize,h_200,w_200',
    normal: 'resize,h_300,w_300',
    large: 'resize,h_540,w_540'
  };
  if (Object.keys(v).indexOf(params) >= 0) params = v[params];
  url = url.replace(/^http:\/\//, 'https://');
  return url + '?x-oss-process=image/format,jpg/quality,Q_85/' + params
}

(<any>window)._imgFormat = imgFormat;

