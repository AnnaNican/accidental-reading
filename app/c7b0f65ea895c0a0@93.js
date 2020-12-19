export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["alphabet@1.csv",new URL("./files/94cd7a492cdafbbe77d590f10cd2735e9fca01b08f8b274b18be3ec7737b513216b253e81c8afa635b47130da26744c87c0ff5c4f16ed397b5e49f36cdbeb623",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md `
You feel productive, you open your laptop, but then an email arrives containing some links or articles. You decide to “quickly check-it out”. You click on a link and skim the article. It contains another reference. You click on it too. Skim another source. Thirty minutes later you are mentally distracted and exhausted remind yourself of the task at hand. And then you realize that you just acquired a wealth of useless information and have not progressed the task at hand. `
)});
  main.variable(observer()).define(["slide"], function(slide){return(
slide`“It is what you read when you don’t have to that determines what you will be when you can’t help it.”
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Rev. D. F. Potter, Slogan, to encourage unprescribed reading. (1927)`
)});
  main.variable(observer()).define(["slide"], function(slide){return(
slide.js`// This is a JavaScript code snippet.
function foo() {
  return 42;
}
“It is what you read when you don’t have to that determines 
what you will be when you can’t help it.”*
`
)});
  main.variable(observer()).define(["slide","tex"], function(slide,tex){return(
slide`You can use LaTeX, too: ${tex.block`
f(\textcolor{hotpink}{x}) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi \textcolor{hotpink}{x}}
    \,d\xi
`}`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","data","x","y","format","xAxis","yAxis"], function(d3,width,height,data,x,y,format,xAxis,yAxis)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);
  
  svg.append("g")
      .attr("fill", "black")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth());
  
  svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .join("text")
      .attr("x", d => x(d.value))
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(d => format(d.value))
    .call(text => text.filter(d => x(d.value) - x(0) < 20) // short bars
      .attr("dx", +4)
      .attr("fill", "black")
      .attr("text-anchor", "start"));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}
);
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([margin.left, width - margin.right])
)});
  main.variable(observer("xAxis")).define("xAxis", ["margin","d3","x","width","data"], function(margin,d3,x,width,data){return(
g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80, data.format))
    .call(g => g.select(".domain").remove())
)});
  main.variable(observer("format")).define("format", ["x","data"], function(x,data){return(
x.tickFormat(20, data.format)
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))
)});
  main.variable(observer("y")).define("y", ["d3","data","margin","height"], function(d3,data,margin,height){return(
d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 30, right: 0, bottom: 10, left: 200}
)});
  main.variable(observer("barHeight")).define("barHeight", function(){return(
25
)});
  main.variable(observer("height")).define("height", ["data","barHeight","margin"], function(data,barHeight,margin){return(
Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("alphabet@1.csv").text(), ({letter, frequency}) => ({name: letter, value: +frequency})).sort((a, b) => d3.descending(a.value, b.value)))
)});
  main.variable(observer("slide")).define("slide", ["md","hl"], function(md,hl)
{
  function slide() {
    const container = document.createElement("div");
    container.className = "slide";
    container.appendChild(md.apply(this, arguments));
    return container;
  }
  function code(strings) {
    const container = document.createElement("div");
    const pre = container.appendChild(document.createElement("pre"));
    const code = pre.appendChild(document.createElement("code"));
    let string = strings[0] + "", i = 0, n = arguments.length;
    while (++i < n) string += arguments[i] + "" + strings[i];
    code.textContent = string.trim();
    container.className = "slide slide--code";
    return container;
  }
  slide.code = code;
  slide.js = function() {
    const container = code.apply(this, arguments);
    const content = container.firstChild.firstChild;
    content.className = "js hljs javascript";
    hl.highlightBlock(content);
    return container;
  };
  slide.img = function(strings) {
    const img = new Image;
    let string = strings[0] + "", i = 0, n = arguments.length;
    while (++i < n) string += arguments[i] + "" + strings[i];
    img.src = string.trim();
    img.className = "slide slide--img";
    return img;
  };
  return slide;
}
);
  main.variable(observer("slide_style")).define("slide_style", ["html"], function(html){return(
html`<style>
.slide {
  width: calc(100% + 28px);
  margin: 0 -14px;
  padding: 10%;
  box-sizing: border-box;
  background: #333;
  color: #eee;
  min-height: 65vw;
  font-size: 5vw;
  line-height: 1.15;
  display: flex;
  align-items: center;
}

.slide a {
  color: hotpink;
}

.slide p,
.slide pre,
.slide img {
  max-width: 100%;
}

.slide--img {
  max-width: none;
  padding: 0;
}

.slide blockquote,
.slide ol,
.slide ul {
  max-width: none;
}

.slide > * {
  width: 100%;
}

.slide code {
  font-size: 80%;
}

.slide--code pre,
.slide--code code {
  font-size: 2.3vw;
}

.slide--code {
  color: rgb(27, 30, 35);
  background: rgb(247, 247, 249);
  border-bottom: solid 1px white;
}

</style>`
)});
  main.variable(observer("hl")).define("hl", ["require"], function(require){return(
require("@observablehq/highlight.js@1.0.0/highlight.min.js")
)});
  return main;
}
