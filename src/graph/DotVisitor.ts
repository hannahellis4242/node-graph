import Graph, { Edge, Vertex } from "./Graph";
import GraphVisitor from "./GraphVisitor";

export default class DotVisitor<VertexType, EdgeType> implements GraphVisitor {
  dotStr: string;
  constructor(
    private graph: Graph<VertexType, EdgeType>,
    graphName: string = "graphname",
    private graphPropFn?: () => string,
    private vertexPropFn?: (
      v: Vertex,
      g: Graph<VertexType, EdgeType>
    ) => string,
    private edgePropFn?: (e: Edge, g: Graph<VertexType, EdgeType>) => string
  ) {
    this.dotStr = "digraph " + graphName + " {\n";
    if (graphPropFn) {
      this.dotStr += graphPropFn() + "\n";
    }
  }
  vertex(v: Vertex): void {
    this.dotStr += v.id.toString();
    if (this.vertexPropFn) {
      this.dotStr += this.vertexPropFn(v, this.graph);
    }
    this.dotStr += ";\n";
  }
  edge(e: Edge): void {
    const source = this.graph.source(e);
    const target = this.graph.target(e);
    if (source && target) {
      this.dotStr += source.id.toString() + " -> " + target.id.toString();
      if (this.edgePropFn) {
        this.dotStr += this.edgePropFn(e, this.graph);
      }
      this.dotStr += ";\n";
    }
  }
  buildDot(): string {
    return this.dotStr + "\n}";
  }
}
