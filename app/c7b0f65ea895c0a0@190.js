// https://observablehq.com/@annanican/accidental-reading@190
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["data-articles-2020.csv",new URL("./files/1bcf8cca88b5f98a4b2d6a06a9cf337688542100bdc1e8694a6f4942c434118ea6e45d6ec0f32f054e6361a566cdd11a873e51f8a6b315c22bf0eb04aa35376c",import.meta.url)],["data-books-2020.csv",new URL("./files/d2d688de2f18707fef8a55bad918593cd6dc3a56d76073779e7c91e302a75d56f501211dea91c21a883901a40d0a6d4cd9df612cdf10d84aa3af02581f7dbf96",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["slide"], function(slide){return(
slide`“It is what you read when you don’t have to that determines what you will be when you can’t help it.”
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`*Rev. D. F. Potter, Slogan, to encourage unprescribed reading. (1927)*`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `
So you feel productive. You open your laptop and start on your project. But then an email arrives containing articles with irrelevant, but enticing names starting with  “40 tips that will change…”, “The most important… “, “The biggest reason, why…” - we, you get the gist. You decide to “quickly check-it out”. You click on the link and skim the article. It contains another reference. You click on it too. Skim another source. Another link. Thirty minutes later, you, mentally distracted and exhausted, trying to get back to work. In the aftermath, you realize that you just acquired some questionably useful information but have not progressed on the task at hand. 

I suspect the above scenario is not uniquely my problem, and many many more fell prey to catchy headlines of random online content. I call it **“accidental reading”**. It is not the reading one plans, but the one that sneaks on your plate the way parents sneaked broccoli onto your plate as a child. Except, the nutritional value of this kind of information is questionable. Some might justify it as [serendipitous virtual discovery](https://blogs.library.jhu.edu/2013/10/browsing-serendipity-and-virtual-discovery/), some may argue that this type of reading can uncover [the surprising number of confluences](https://failfast.com/2013/01/29/the-benefits-of-accidental-reading/) . But I refuse to believe that clicking another Medium article “10 Javascript Hacks every developer should know” will improve my coding (or a more low-brow version “10 Lifehacks that every developer should know” will improve my productivity). In fact, I suspect that it robs me of time and mental concentration that I could invest in things I care about.

Instead of speculating on the value of my information diet, I have decided to approach the issue scientifically and just measure it. During 2020 I  recorded all the articles I read.  My system was extremely simple: I kept a markdown file and every time I read an article, I dropped a link to the bottom of the list. At the same time, if I wanted to read an article but did not want to go down the rabbit hole of bottomless internet content,  I placed an article URL on top of the file.  So here we are, at the end of 2020. The file is complete and it’s time to draw empirical conclusions.  

What did I find? I was devastated that my top categories were “Business and Industrials” (the category for news about companies and markets) and “News”(the category for content related to COVID-19). You see, I pride myself as an “I don’t read News” person. Hence seeing my data question definition of my identity was dispiriting. The one gleam of hope and the caveat to below chart is that I broke down articles related to work into 5 subcategories:” Computer Science” (about concepts like “databases”), “Software Development” (practical articles with code snippets and references), Computer and Electronics (general content about computers and electronics”), “Machine Learning” (strictly ML) and “Multimedia Software” (related to creative coding). Combined together into one mega-category “Programming” it outweighs “news 3x times. But instead of playing subcategory excuse, I am going to blame results of this Barnhart on the year of pandemic and claim the necessity to stay “informed” :) . 
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
md`Another insight was time squandered on accidental reading. Due to the simplicity of my experiment I did not capture the actual time spent on the activity. However, I have scraped the text and computed word counts.  Given the average reading speed, I probably spent about 87 hours reading about approximately 1.3 million words. Is it a lot or a little? To properly compare it, I decided to bring “intentional reading” - the good, old books. At 90 books this year, I have netted 31753 pages. The rule of thumb for publishes 300 words per page, puts me at 9.5 million words and 635 hours of reading the books. (It might sound like a lot, but only the book “Gotham: A History of New York City to 1898" audiobook is 67 hours long, so 635 hours sounds pretty reasonable to me. The realization that my intentional reading was still selective and outstripped my accidental manyfold gave me relief. I was happy to find out that I was in control of my information consumption.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`|Content Type      | Words      | Minutes Reading     | Hours Reading      | 
| -------------- | -------------- | -------------- | -------------- | 
| Accidental reading | 1,311,423 | 5,245 | 87.4 | 
| Intentional Book Reading | 9,262,500 | 37,050 | 617.5|

*assumptions: 1.Avg book contains 300 words per page 2.Avg Reading speed is 250 words per minute*
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`In retrospect, I can improve the measurement making it more accurate and interesting. I could capture the exact time spent (just do it with RescueTime). I could even monitor “skimming vs “reading”. But this year I am satisfied with my “lazy” solution sacrificing the rigor of monitoring for quickness and demonstrating to myself the importance of diligence of tracking where we invest our time. 

We are obsessed with things we put into our bodies. Yet, surprisingly, we are not as careful with our “mind diets” and what we put into our brains. Where are my “information-wellness” gurus and coaches who could help construct a reading list? While a lot of information debate is concerned with the accuracy of the publications (aka“fake news”), even reputable sources can “waste our time”. While this year I have tried to put myself on a strict information regiment, I still managed to accidentally guzzle a huge volume of news category. This experiment is evidence that our choice of media diets is illusionary. At least mine. Yet the long and intentional reads of good old paper-printed media seems to allow make the reading intentional again.  `
)});
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
  main.variable(observer("yAxis_books")).define("yAxis_books", ["margin","d3","y","data_books"], function(margin,d3,y,data_books){return(
g  => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data_books[i].name).tickSizeOuter(0))
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
