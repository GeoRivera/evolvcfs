# evolvcfs

A helper function library for developing **Evolv-CS** Forms.
+ **jQuery** is a dependency (pre-loaded by Evolv-CS)
+ I'm also relying on **es5-shim** to keep me sane.
+ The code needs to work on **ie5** due to some legacy *VBScript* functions the System depends on.


### Prod
```javascript
// direct link
$('body').append('<script src=\'https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js\'></script>');
$('body').append('<script src=\'https://cdn.jsdelivr.net/gh/GeoRivera/evolvcfs@1/lib/evolvcfs.min.js\'></script>');

// escaped link for use inside XML
$(&apos;body&apos;).append(&apos;&lt;script src=\&apos;https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js\&apos;&gt;&lt;/script&gt;&apos;);
$(&apos;body&apos;).append(&apos;&lt;script src=\&apos;https://cdn.jsdelivr.net/gh/GeoRivera/evolvcfs@1/lib/evolvcfs.min.js\&apos;&gt;&lt;/script&gt;&apos;);
```


### DEV
```javascript
// direct link
$('body').append('<script src=\'https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js\'></script>');
$('body').append('<script src=\'https://rawgit.com/GeoRivera/evolvcfs/DEV/lib/evolvcfs.min.js\'></script>');

// escaped link for use inside XML
$(&apos;body&apos;).append(&apos;&lt;script src=\&apos;https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js\&apos;&gt;&lt;/script&gt;&apos;);
$(&apos;body&apos;).append(&apos;&lt;script src=\&apos;https://rawgit.com/GeoRivera/evolvcfs/DEV/lib/evolvcfs.min.js\&apos;&gt;&lt;/script&gt;&apos;);
```
