<template>
  <div class="ellipsis" ref="container">
    <span class="ellipsis-plus-txt ellipsis-2" ref="txt">
      Est est alias iusto et quo voluptate nam. Vero debitis et molestiae aut quos. Facere inventore alias magnam quod officiis omnis esse. Et laborum esse optio.
    </span>
    <!-- <span class="ellipsis-plus-ellipsis" ref="ellipsis" :style="{'display':show?'none':'inline-block'}">{{ ellipsis }}</span> -->
  </div>
</template>
<script>
const supportCss = style => {
  let prefix = ['webkit', 'Moz', 'ms', 'o']
  let i
  let humpString = []
  let htmlStyle = document.documentElement.style
  const _toHumb = function(string) {
    return string.replace(/-(\w)/g, function($0, $1) {
      return $1.toUpperCase()
    })
  }

  for (i in prefix) {
    humpString.push(_toHumb(prefix[i] + '-' + style))
  }

  humpString.push(_toHumb(style))

  for (i in humpString) {
    if (humpString[i] in htmlStyle) {
      return true
    }
  }

  return false
}
export default {
  name: 'ellipsis',
  data() {
    return {}
  },
  beforeMount() {
    console.log(supportCss('width'), supportCss('line-clamp'))
    if ('webkitLineClamp' in document.documentElement.style) {
      console.log('webkitLineClamp')
    }
  }
}
</script>
<style lang="css" scoped>
.ellipsis {
  width: 100%;
}
</style>
