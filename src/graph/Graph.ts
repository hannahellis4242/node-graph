import KeyValuePair from "./util/KeyValuePair";
import GraphVisitor from "./GraphVisitor";

export class Vertex {
  constructor(public id: number) {}
}

export class Edge {
  constructor(public id: number) {}
}

export default class Graph<VertexType, EdgeType> {
  //lists to store graph information
  vertices: Vertex[];
  edges: Edge[];
  source_map: KeyValuePair<Edge, Vertex>[];
  target_map: KeyValuePair<Edge, Vertex>[];
  //lists to store extra information
  vertex_map: KeyValuePair<Vertex, VertexType | null>[];
  edge_map: KeyValuePair<Edge, EdgeType | null>[];
  constructor() {
    this.vertices = [];
    this.edges = [];
    this.source_map = [];
    this.target_map = [];

    this.vertex_map = [];
    this.edge_map = [];
  }

  addVertex(): Vertex {
    const id = this.vertices.reduce<number>(
      (max, v) => (v.id > max ? v.id : max),
      0
    );
    const v = new Vertex(id + 1);
    this.vertices.push(v);
    this.vertex_map.push(new KeyValuePair(v, null));
    return v;
  }

  addEdge(source: Vertex, target: Vertex): Edge {
    const id = this.edges.reduce<number>(
      (max, e) => (e.id > max ? e.id : max),
      0
    );
    const e = new Edge(id + 1);
    this.edges.push(e);
    this.source_map.push(new KeyValuePair(e, source));
    this.target_map.push(new KeyValuePair(e, target));
    this.edge_map.push(new KeyValuePair(e, null));
    return e;
  }

  source(e: Edge): Vertex | null {
    const entry = this.source_map.find(({ key }) => key == e);
    return entry ? entry.value : null;
  }

  target(e: Edge): Vertex | null {
    const entry = this.target_map.find(({ key }) => key == e);
    return entry ? entry.value : null;
  }

  outEdges(v: Vertex): Edge[] {
    return this.source_map
      .filter(({ value }) => v == value)
      .map(({ key }) => key);
  }

  inEdges(v: Vertex): Edge[] {
    return this.target_map
      .filter(({ value }) => v == value)
      .map(({ key }) => key);
  }

  edgesBetween(source: Vertex, target: Vertex): Edge[] {
    const a = this.outEdges(source);
    const b = this.inEdges(target);
    return a.filter((value) => b.includes(value));
  }

  adjacentVertices(v: Vertex): Vertex[] {
    return this.outEdges(v)
      .map((edge) => this.target(edge))
      .filter((x): x is Vertex => x !== null)
      .reduce<Vertex[]>((acc, v) => {
        if (acc.includes(v)) {
          return acc;
        } else {
          return [...acc, v];
        }
      }, []);
  }

  getVertex(x: Vertex): VertexType | null {
    const out = this.vertex_map.find(({ key }) => key == x);
    return out ? out.value : null;
  }

  getEdge(x: Edge): EdgeType | null {
    const out = this.edge_map.find(({ key }) => key == x);
    return out ? out.value : null;
  }

  setVertex(v: Vertex, value: VertexType) {
    const entry = this.vertex_map.find(({ key }) => key == v);
    if (entry) {
      entry.value = value;
    }
  }

  setEdge(e: Edge, value: EdgeType) {
    const entry = this.edge_map.find(({ key }) => key == e);
    if (entry) {
      entry.value = value;
    }
  }

  visit(visitor: GraphVisitor) {
    this.vertices.forEach((v) => visitor.vertex(v));
    this.edges.forEach((e) => visitor.edge(e));
  }
}
