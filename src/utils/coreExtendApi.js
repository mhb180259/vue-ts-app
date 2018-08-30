
Object._clone = (v) => {
  if (!v) return v;
  return JSON.parse(JSON.stringify(v));
};

// 只支持{key:'String'}
Object._toString = (obj) => {
  let s = "";
  if (!obj) return "";
  Object.keys(obj).sort().forEach(function(key) {
    s = s + "^^" + key + "@" + obj[key];
  });
  return s;
};

Array.prototype._object = function(field) {
  var obj = {};
  if (!field) return obj;
  for (var i = 0; i < this.length; i++) {
    var item = this[i];
    obj[item[field]] = item;
  }
  return obj;
};

Array.prototype._push = function(arr, opt) {
  if (!arr) return;
  for (var i = 0; i < arr.length; i++) {
    var val = arr[i];
    // 一般为奇偶x_group =2
    if (opt && opt.x_group) {
      // 设置奇欧
      val.x_group = i % opt.x_group;
    }
    if (opt && opt.x_new) {
      // 设置奇欧
      val.x_new = i % opt.x_new;
      val.x_new = false;
      if (val.tag && val.tag.indexOf("新品") !== -1) {
        val.x_new = true;
      }
    }
    this.push(arr[i]);
  }
  return this;
};

Array.prototype._group = function(field) {
  var obj = {};
  if (!field) return obj;
  for (var i = 0; i < this.length; i++) {
    var item = this[i];
    var v = obj[item[field]];
    if (!v) {
      v = [];
      obj[item[field]] = v;
    }
    v.push(item);
  }
  return obj;
};

Array.prototype._assign = function(ext) {
  if (!ext) return;
  for (var i = 0; i < this.length; i++) {
    Object.assign(this[i], ext);
  }
  return this;
};
