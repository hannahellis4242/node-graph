export default class KeyValuePair<Key, Value> {
  constructor(public key: Key, public value: Value) {}

  equal(other: KeyValuePair<Key, Value>): boolean {
    return this.key === other.key && this.value === other.value;
  }
}
