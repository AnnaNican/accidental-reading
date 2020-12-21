export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["data-articles-2020.csv",new URL("./files/1bcf8cca88b5f98a4b2d6a06a9cf337688542100bdc1e8694a6f4942c434118ea6e45d6ec0f32f054e6361a566cdd11a873e51f8a6b315c22bf0eb04aa35376c",import.meta.url)],["data-books-2020.csv",new URL("./files/d2d688de2f18707fef8a55bad918593cd6dc3a56d76073779e7c91e302a75d56f501211dea91c21a883901a40d0a6d4cd9df612cdf10d84aa3af02581f7dbf96",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["slide"], function(slide){return(
slide`“It is what you read when you don’t have to that determines what you will be when you can’t help it.”
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Rev. D. F. Potter, Slogan, to encourage unprescribed reading. (1927)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `
You feel productive, you open your laptop, but then an email arrives containing some links or articles. You decide to “quickly check-it out”. You click on a link and skim the article. It contains another reference. You click on it too. Skim another source. Thirty minutes later you are mentally distracted and exhausted remind yourself of the task at hand. And then you realize that you just acquired a wealth of useless information and have not progressed the task at hand. 



`
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
  main.variable(observer()).define(["md"], function(md){return(
md`Another insight was words read. I have not recorded how much time I have spend reading, but I have scraped. Not all were scraped but so far I have counted ~ 1.3 million words. The average reading speed according to google is 250 words, so I have spent 5,245 minutes or 87n hours accidentally reading articles. Is it a lot or a little. To properly compare it, I decided to bring intentional reading - the paper books.

At 90 books per year,I have netted 31753 pages. The rule of thumb for publishes 300 words per page, which puts me at 9.5 million words and 635 hours of reading the books. It might sounds like a lot, but only Gotham audio book is 67 hours long, so 635 hours sounds pretty reasonable to me.
This realization brought me a relief - that my intentional reading was still selective and `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`| Content Type      | Words      | Minutes Reading     | Hours Reading      | % of Time Awake      |
| -------------- | -------------- | -------------- | -------------- | -------------- |
| Accidental Article Reading | Row 1 Column 2 | Row 1 Column 3 | Row 1 Column 4 | Row 1 Column 5 |
| Intentional Book Reading | Row 2 Column 2 | Row 2 Column 3 | Row 2 Column 4 | Row 2 Column 5 |`
)});
  main.variable(observer("chart_books")).define("chart_books", ["d3","width","height","data_books","x","y","format","xAxis","yAxis"], function(d3,width,height,data_books,x,y,format,xAxis,yAxis)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);
  
  svg.append("g")
      .attr("fill", "black")
    .selectAll("rect")
    .data(data_books)
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
    .data(data_books)
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
Object.assign(d3.csvParse(await FileAttachment("data-articles-2020.csv").text(), ({category, frequency}) => ({name: category, value: +frequency})).sort((a, b) => d3.descending(a.value, b.value)))
)});
  main.variable(observer("data_books")).define("data_books", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("data-books-2020.csv").text(), ({category, frequency}) => ({name: category, value: +frequency})).sort((a, b) => d3.descending(a.value, b.value)))
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
