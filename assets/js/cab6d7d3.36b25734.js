"use strict";(self.webpackChunkquai_docs=self.webpackChunkquai_docs||[]).push([[1306],{3905:(e,n,i)=>{i.d(n,{Zo:()=>d,kt:()=>g});var t=i(7294);function a(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function r(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,t)}return i}function o(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?r(Object(i),!0).forEach((function(n){a(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function c(e,n){if(null==e)return{};var i,t,a=function(e,n){if(null==e)return{};var i,t,a={},r=Object.keys(e);for(t=0;t<r.length;t++)i=r[t],n.indexOf(i)>=0||(a[i]=e[i]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)i=r[t],n.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var s=t.createContext({}),l=function(e){var n=t.useContext(s),i=n;return e&&(i="function"==typeof e?e(n):o(o({},n),e)),i},d=function(e){var n=l(e.components);return t.createElement(s.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},h=t.forwardRef((function(e,n){var i=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),m=l(i),h=a,g=m["".concat(s,".").concat(h)]||m[h]||u[h]||r;return i?t.createElement(g,o(o({ref:n},d),{},{components:i})):t.createElement(g,o({ref:n},d))}));function g(e,n){var i=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=i.length,o=new Array(r);o[0]=h;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c[m]="string"==typeof e?e:a,o[1]=c;for(var l=2;l<r;l++)o[l]=i[l];return t.createElement.apply(null,o)}return t.createElement.apply(null,i)}h.displayName="MDXCreateElement"},3639:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var t=i(7462),a=(i(7294),i(3905));const r={title:"Merged Mining",description:"How merged mining is used to scale in Quai Network.",slug:"/merged-mining",hide_table_of_contents:!1,sidebar_position:3},o="Merged Mining",c={unversionedId:"learn/advanced-introduction/merged-mining/merged-mining",id:"learn/advanced-introduction/merged-mining/merged-mining",title:"Merged Mining",description:"How merged mining is used to scale in Quai Network.",source:"@site/docs/learn/advanced-introduction/merged-mining/merged-mining.md",sourceDirName:"learn/advanced-introduction/merged-mining",slug:"/merged-mining",permalink:"/docs/merged-mining",draft:!1,editUrl:"https://github.com/dominant-strategies/quai-docs/tree/main/docs/learn/advanced-introduction/merged-mining/merged-mining.md",tags:[],version:"current",lastUpdatedBy:"Juuddi",lastUpdatedAt:1692116968,formattedLastUpdatedAt:"Aug 15, 2023",sidebarPosition:3,frontMatter:{title:"Merged Mining",description:"How merged mining is used to scale in Quai Network.",slug:"/merged-mining",hide_table_of_contents:!1,sidebar_position:3},sidebar:"learnSidebar",previous:{title:"Latency",permalink:"/docs/latency"},next:{title:"Coincident Blocks",permalink:"/docs/coincident-blocks"}},s={},l=[{value:"What is Merged Mining?",id:"what-is-merged-mining",level:2},{value:"Coincident Blocks",id:"coincident-blocks",level:2},{value:"Energy Efficiency",id:"energy-efficiency",level:2},{value:"Merge-Mined Parachains",id:"merge-mined-parachains",level:2}],d={toc:l},m="wrapper";function u(e){let{components:n,...i}=e;return(0,a.kt)(m,(0,t.Z)({},d,i,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"merged-mining"},"Merged Mining"),(0,a.kt)("p",null,"Merged mining is mining a combined header generated from multiple blockchains. The idea of merged mining was ",(0,a.kt)("a",{parentName:"p",href:"https://bitcointalk.org/index.php?topic=1790.msg28696#msg28696"},"first conceived by the pseudoanonymous Satoshi Nakamoto in December 2010"),". Quai has extended Satoshi's concept with the implementation of merged mining in a network of blockchains which have the same shared protocol. This implementation allows all Quai chains to share security through the eventual commitment of all network hashpower. In addition, the process of merged mining leads to the automatic creation of hash linked references between Quai chains which enable trustless cross-chain state transitions. By using merged mining to create a multithreaded execution environment, ",(0,a.kt)("a",{parentName:"p",href:"/docs/energy-efficiency"},"Quai makes Proof-of-Work over 10,000 times more energy efficient than Bitcoin"),"*","."),(0,a.kt)("h2",{id:"what-is-merged-mining"},"What is Merged Mining?"),(0,a.kt)("p",null,"Merged mining occurs when a miner is able to check each nonce they hash against the difficulty threshold of multiple distinct blockchains. In practice, this allows a single computer to mine and secure many blockchains simultaneously with no increase in hardware requirements or energy consumption."),(0,a.kt)("p",null,"Merged mining can be conducted only between blockchains utilizing the same hashing algorithm. All Quai blockchains use the Blake3 hashing algorithm, and third party chains that use Blake3 can decide to merge-mine with Quai. Each Quai miner merge-mines three blockchains simultaneously -- one from each tier of Quai's hierarchy."),(0,a.kt)("h2",{id:"coincident-blocks"},"Coincident Blocks"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/coincident-blocks"},"Coincident blocks")," are blocks that are valid in multiple Quai blockchains. Coincident blocks create atomic, hash linked references between chains. When merged mining multiple blockchains, miners will occasionally find nonces that fulfill the difficulty requirements of multiple blockchains. Thus, coincident blocks are a natural byproduct of merged mining, and require no mechanism outside of Proof-of-Work mining to be created."),(0,a.kt)("p",null,"Coincident blocks keep all Quai blockchains interlinked by periodically pegging subordinate chains to the work of the Prime chain, and allow for data to be transmitted between chains in a trustless environment through the creation of hash linked references."),(0,a.kt)("h2",{id:"energy-efficiency"},"Energy Efficiency"),(0,a.kt)("p",null,"Merged mining enables Quai to utilize miners at much greater efficiency, reducing the per-transaction energy cost of Proof-of-Work. Because merged mining leads to no increase in energy expenditure but a drastic increase in available block space, Quai offers the most efficient allocation of energy resources, maximizing block space and on-chain security per kW/h."),(0,a.kt)("h2",{id:"merge-mined-parachains"},"Merge-Mined Parachains"),(0,a.kt)("p",null,"Quai allows ",(0,a.kt)("a",{parentName:"p",href:"/docs/parachains"},"merge-mined parachains")," to derive security from Quai Network. While Quai's merged mining focuses on merge-mining many Quai-specific chains simultaneously, any blockchain that utilizes the Blake3 hashing algorithm can bootstrap security and trustless bridging by enabling merged mining with Quai."),(0,a.kt)("p",null,"All Quai block headers contain data fields for Prime, Region, and Zone in addition to a single empty data field. This empty field allows Quai miners to insert the block header of a parachain into a Quai block header, creating a valid Quai block and a valid parachain block simultaneously. The parachain coincident block serves the same purpose as intra-network coincident blocks, in that it provides a hash linked reference between chains, facilitating trustless state transfers."),(0,a.kt)("p",null,"Parachain liveliness is determined by market forces. Each block leaves only a single empty data field, creating a competitive environment for parachains to incentivize Quai miners."),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"*","Per transaction, assuming full transactional load and the same number of miners on both Quai Network and the Bitcoin Network.")))}u.isMDXComponent=!0}}]);