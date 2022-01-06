import { Vertex, Edge } from "./Graph";

export default interface GraphVisitor {
  vertex(v: Vertex): void;
  edge(e: Edge): void;
}
