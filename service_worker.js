if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let f={};const b=e=>i(e,c),o={module:{uri:c},exports:f,require:b};s[c]=Promise.all(a.map((e=>o[e]||b(e)))).then((e=>(r(...e),f)))}}define(["./workbox-14ff3674"],(function(e){"use strict";e.setCacheNameDetails({prefix:"blockbench"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"cf7f81b2752335df519a341ac48f7bf0"},{url:"favicon.png",revision:"bb17c5c284076fc17e3399860df472d7"},{url:"js/animations/animation.js",revision:"736bbc1c2aba647eba9cf856a3f4e421"},{url:"js/animations/keyframe.js",revision:"b044445be900f98cb1ff663914b26768"},{url:"js/animations/timeline_animators.js",revision:"69e01fafaa580b4eb8d783f151dbe018"},{url:"js/animations/timeline.js",revision:"b5a6853720fcb990ccf14ec0c275c81b"},{url:"js/api.js",revision:"15cdbf4929628bf88920d7288a8830ce"},{url:"js/blockbench.js",revision:"ab0aad07799ef808987f686e60311da6"},{url:"js/boot_loader.js",revision:"1af98045194ad0fb028955373ebee6cf"},{url:"js/copy_paste.js",revision:"b7b027f3ad55e9f9c2ccad71418c9a1a"},{url:"js/desktop.js",revision:"0f7edd0c16ac055067eab1e9829bf630"},{url:"js/display_mode.js",revision:"62e8f08a6ec08d3f588be93d9bbbbf8f"},{url:"js/edit_sessions.js",revision:"fda3de0109f4d04602e23abe1c033e17"},{url:"js/file_system.js",revision:"f6cdfa60201ced8aa6cf7dea1e5035b9"},{url:"js/globals.js",revision:"cccd5027e28ac5729607a75eb2dc81a3"},{url:"js/interface/about.js",revision:"a09c944cf60f18251ab15de3bac00c24"},{url:"js/interface/action_control.js",revision:"676ce169fbe1c7bfada00088c0d4d70d"},{url:"js/interface/actions.js",revision:"3dc746ac0a58bc11afdc676ee8b38754"},{url:"js/interface/dialog.js",revision:"36ecee69a15e181b991cc5f46237b6e0"},{url:"js/interface/interface.js",revision:"c7bf4c1e1dd665b8f1645c6d675e5b0e"},{url:"js/interface/keyboard.js",revision:"2d5ff61eee3b036cc5b98b7dc67c9ba7"},{url:"js/interface/menu.js",revision:"3b72277e2e40300e22e6fb88a6e0bba4"},{url:"js/interface/panels.js",revision:"a6ec7bb72e415c523082d8e08f464118"},{url:"js/interface/settings.js",revision:"6b6e369af5311ead7926d946a12cdf8d"},{url:"js/interface/start_screen.js",revision:"98ac5fae09763d8cd2a92d53da896960"},{url:"js/interface/themes.js",revision:"1d4a99431ee0bb7a5a14589c80084f71"},{url:"js/io/codec.js",revision:"45db0378cdcb13c5d133fc530687122d"},{url:"js/io/format.js",revision:"ab841f43e2651fa2ca57b5ccc33fb1b7"},{url:"js/io/formats/bbmodel.js",revision:"1f2045c4d67a1a351939cceccaaa33df"},{url:"js/io/formats/bedrock_old.js",revision:"41c7417af9b7a09ea7c5c2b4be59a621"},{url:"js/io/formats/bedrock.js",revision:"ad65a59f591fd26c318d79302a0b0bc6"},{url:"js/io/formats/collada.js",revision:"a1d6a3b0aa75793c9ee59ad4993e5a9a"},{url:"js/io/formats/gltf.js",revision:"dfcbb6428e3a04865a01aff01ba11c85"},{url:"js/io/formats/java_block.js",revision:"b45af07ed41e3afe2e6e893d03898c0c"},{url:"js/io/formats/modded_entity.js",revision:"21f4e9350bbeb2b5ec80baf9331f1132"},{url:"js/io/formats/obj.js",revision:"efe147bfecaf4e2f944f509e13135abe"},{url:"js/io/formats/optifine_jem.js",revision:"982906e278be20c7da41f38e738236ce"},{url:"js/io/formats/optifine_jpm.js",revision:"9787b52d1d66246133b514e227198156"},{url:"js/io/formats/skin.js",revision:"3c3d735f4ac43ae97d7d2cb7dc5e0796"},{url:"js/io/io.js",revision:"d6f5399110aa66b9f1ea8de5a737e6ff"},{url:"js/io/project.js",revision:"91ad8e113007a6f5be4ba3a002ebb80c"},{url:"js/modes.js",revision:"6f85b14884a6c35e30fb5ebcd2f72396"},{url:"js/outliner/cube.js",revision:"f18523d41ea6881aee2081f1cc9d5347"},{url:"js/outliner/group.js",revision:"8e3d886f20fb0e7c120972051fec0787"},{url:"js/outliner/locator.js",revision:"59f1bcf354b14ca0f13506b60cf3d0ed"},{url:"js/outliner/mesh.js",revision:"fbf1126c843b2cae383a42a6a2dc24a5"},{url:"js/outliner/null_object.js",revision:"78e7bbafe8b0e8b66f9269548b14342f"},{url:"js/outliner/outliner.js",revision:"1f0cab6f884feaebe6653512f26d379d"},{url:"js/outliner/texture_mesh.js",revision:"00f7134c334e7a7418f5ba049d3f24e4"},{url:"js/plugin_loader.js",revision:"f59df333d81e70b9a393ebc5bc9ad14c"},{url:"js/preview/canvas.js",revision:"ff77fdef9af337e0c2ca8dc5c233509c"},{url:"js/preview/OrbitControls.js",revision:"53e77d6fd939d9db2ae69bf8e1a94b76"},{url:"js/preview/preview.js",revision:"bc94cf6222a1ab36069a55d034280f11"},{url:"js/preview/screenshot.js",revision:"18ffd92daf954b9dff43bae4ea0974e1"},{url:"js/preview/transformer.js",revision:"7302843838a4437ee8707daf6a826d4e"},{url:"js/property.js",revision:"bab56b1c980fd8c0991522163b6cc92f"},{url:"js/texturing/color.js",revision:"571050e0085d32795a8d3767b3112605"},{url:"js/texturing/edit_texture.js",revision:"ac05261ec4ccaf293d1c26ea1242703a"},{url:"js/texturing/painter.js",revision:"85efaa993e41b2f9b75a519964077abc"},{url:"js/texturing/texture_generator.js",revision:"3532aadaf3e8666f4227bebe40bd750b"},{url:"js/texturing/textures.js",revision:"371765abc9bc4d2112b43e2ce9a06c97"},{url:"js/texturing/uv.js",revision:"8602513f13940208e6edb4979b507211"},{url:"js/transform.js",revision:"f4a780ada2a06c9abb1a1f18a6453d4b"},{url:"js/undo.js",revision:"3e2b90e83120f9044b50faad534a0c3c"},{url:"js/util.js",revision:"93df73e970157aa7be964ffd2d74db53"},{url:"js/web.js",revision:"61897767526d38810dc7c74530ab0802"},{url:"js/webpack/bundle.js",revision:"71ed3ea4c9e44b89af5d0bba9f8acce7"},{url:"lib/CanvasFrame.js",revision:"af677de11b513f6c8c8ff96e31e59acd"},{url:"lib/color-picker.min.js",revision:"1725de455ed2f45daafb69dd90413104"},{url:"lib/fik.min.js",revision:"9985a46a1107966f2375d0c61241c689"},{url:"lib/FileSaver.js",revision:"547422b2d7a739f14eefa1fc1c59c658"},{url:"lib/gif.js",revision:"6760f4c06414ceb8b3d30e14d3a59c69"},{url:"lib/gif.worker.js",revision:"d8cc71ca8334b5002e4481497802c2ac"},{url:"lib/GLTFExporter.js",revision:"761d87878a43c46d12376baa31a9cf6f"},{url:"lib/jimp.min.js",revision:"44fc5c9cee92b9d0d7738f21353297b9"},{url:"lib/jquery-ui.min.js",revision:"f7275ece7d6dea2aec3c23457415695c"},{url:"lib/jquery.js",revision:"3e4bb227fb55271bfe9c9d4a09147bd8"},{url:"lib/jszip.min.js",revision:"5ab88d8028258f8c1d0ae2ab85d1e2bd"},{url:"lib/lzutf8.js",revision:"03bf50c6517faab0490ec526cacc81e4"},{url:"lib/marked.min.js",revision:"f12d4a87973b8b958222aca5fdb84394"},{url:"lib/molang-prism-syntax.js",revision:"b0f1fa782ca08a1dfc4c4ee43ee3e88b"},{url:"lib/molang.umd.js",revision:"746c64956a5973af8f911a3a34688b4e"},{url:"lib/peer.min.js",revision:"da4b6c59e67068a4da26ebfc6b52f7c5"},{url:"lib/prism.js",revision:"553c272cfec870cd2a68d33743e0f903"},{url:"lib/spectrum.js",revision:"e768b31f35e9aa6eab2973a9e909639a"},{url:"lib/targa.js",revision:"17c5ce65af686baa97294748f929541e"},{url:"lib/three_custom.js",revision:"461c26c501bb7415ed90c370cd09cf43"},{url:"lib/three.min.js",revision:"0a8a3113f4c503210e9a8de577025ff4"},{url:"lib/vue_sortable.js",revision:"87cfedd91d600fb8d44668a0e83d4101"},{url:"lib/vue.min.js",revision:"0a9a4681294d8c5f476687eea6e74842"},{url:"lib/VuePrismEditor.min.js",revision:"5c1566c30c628a99734ca9c6d89861a7"},{url:"lib/wintersky.umd.js",revision:"ebbe53f938308744f811df838d2f0f1f"},{url:"css/colors.css",revision:"4408651ae9d791d6ff49a0b6d76b4375"},{url:"css/dialogs.css",revision:"63d9c836a4680c446119f37fe0caa69c"},{url:"css/fontawesome.css",revision:"1cd088b35b0d3fac7265a75875471484"},{url:"css/general.css",revision:"6029bfd1b1351127cd0946e3730fe8c0"},{url:"css/jquery-ui.min.css",revision:"2d1384ca6334e004f6bba1b3dc7ddd13"},{url:"css/panels.css",revision:"1fc9b6c7b98a8d35581d87037e464b2d"},{url:"css/prism.css",revision:"e684e60c0c17182e96a7d96b6c1a71d3"},{url:"css/setup.css",revision:"04194cb91bf1360445eed67d6607db3f"},{url:"css/spectrum.css",revision:"f28ec14a773962b92665392c52e967bf"},{url:"css/w3.css",revision:"04db708c100ea3937a3a5bf138cfcbf3"},{url:"css/window.css",revision:"55c575381f08cadbf418e6758ad1445e"},{url:"assets/armor_stand.png",revision:"3df02c489fe7757dab55113d4fc057fd"},{url:"assets/brush.png",revision:"b6a28bb79f9dea063d7a2ac620a3236a"},{url:"assets/hud.png",revision:"049320fa871e4fbe54978dd6043acd8c"},{url:"assets/inventory_full.png",revision:"430fc3c0627f04302d457eead5e1fa16"},{url:"assets/inventory_nine.png",revision:"28cc307e3f2ee4570532fe6ee01a6131"},{url:"assets/item_frame.png",revision:"08eaa797bfb1ceb3784b6fa04ce77387"},{url:"assets/logo_cutout.svg",revision:"c0588aa5cc8b0d757f6b0065d49268da"},{url:"assets/logo_text_white.svg",revision:"021abc358f6fd915b2ad77d548bb1954"},{url:"assets/missing_blend.png",revision:"5d055c1476e74bcdfd987ab62045b8a6"},{url:"assets/missing.png",revision:"462b3d598e49c3bbd453bb01d88ac6aa"},{url:"assets/north.png",revision:"d6c44f75fe7a6dd16927b9b8d8d0e9c2"},{url:"assets/player_skin.png",revision:"bd60891dc6eacb8f038556dfdb1dadcc"},{url:"assets/poses/aiming.svg",revision:"99cc4acebde8bf10e5578a6ff0c4d418"},{url:"assets/poses/crouching.svg",revision:"ea45f7a8485078ac9fc50bf6cf032542"},{url:"assets/poses/jumping.svg",revision:"268a1a6966abb5b8eef0fc783017b980"},{url:"assets/poses/natural.svg",revision:"1bc79dd4c044a9fd330745699db6d721"},{url:"assets/poses/none.svg",revision:"38929100bfd2f391c3650fdde20b0e03"},{url:"assets/poses/sitting.svg",revision:"23eab940f7e9729a6e24438487553e7d"},{url:"assets/poses/walking.svg",revision:"eee91b6c25b42f5901961d39d35854d5"},{url:"assets/rotate_cursor.png",revision:"092b9000c5901c27d4bee37236f6407c"},{url:"assets/splash_art.png",revision:"fe6ebfaaff3fedb678f5916ec2ea77a1"},{url:"assets/uv_preview.png",revision:"dc46b13a7544fe5b4381ef8295c72c8b"},{url:"assets/vertex.png",revision:"6b314afc9e5a153db6798cf8c0a93918"},{url:"assets/zombie.png",revision:"648e846e49c7563eb2625f39b76155b2"},{url:"font/Assistant-Bold.ttf",revision:"d582391da9a68daf10a2ed2514c33826"},{url:"font/Assistant-ExtraBold.ttf",revision:"f2bbc6bae2ee3ce641adc1bb1a655371"},{url:"font/Assistant-ExtraLight.ttf",revision:"5e4d348ae3eca48143c0274a3124a9c0"},{url:"font/Assistant-Light.ttf",revision:"5415f395c1567a5c19efc1dc2892927a"},{url:"font/Assistant-Regular.ttf",revision:"e2b46dd69f54e57767ceef1d5fc8e688"},{url:"font/Assistant-SemiBold.ttf",revision:"d6759edb35ac7f29a029caa1192c010d"},{url:"font/fa-brands-400.woff2",revision:"a9afdb72826cde196ddf29eb8f9d0f8f"},{url:"font/fa-regular-400.woff2",revision:"f817938f131b0cabee81e59a96f9c2a6"},{url:"font/fa-solid-900.woff2",revision:"297973a488f688271dd223d542ba2697"},{url:"font/icomoon.ttf",revision:"6c533223c54e6efaff1e3bd2cf997750"},{url:"font/icomoon.woff",revision:"edb58213d61e108e1c28f396aec82691"},{url:"font/MaterialIcons-Regular.ttf",revision:"548cdd0e4a7d21c2a9c3bc8580254239"}],{})}));
