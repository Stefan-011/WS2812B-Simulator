export class node {
  _NEXT;
  constructor() {
    this._NEXT = null;
  }
  getNext() {
    return this._NEXT;
  }
  setNext(node) {
    this._NEXT = node;
  }
}

export class linkedlist {
  #HEAD;
  #SIZE;

  constructor() {
    this.#HEAD = null;
    this.#SIZE = 0;
  }
  getHead() {
    return this.#HEAD;
  }
  getSize() {
    return this.#SIZE;
  }

  addNode(new_node) {
    if (this.#HEAD == null) {
      this.#HEAD = new_node;
      this.#SIZE++;
      return;
    }
    let curr_node = this.#HEAD;
    while (curr_node !== null) {
      if (curr_node.getNext() === null) {
        curr_node.setNext(new_node);
        this.#SIZE++;
        return;
      }
      curr_node = curr_node.getNext();
    }
  }

  removeNode(serial_num) {
    let curr_node = this.#HEAD;
    let prev_node;
    while (curr_node != null) {
      if (curr_node.getSerialNumber() === serial_num) {
        prev_node.setNext(curr_node.getNext());
        curr_node = null;
        this.#SIZE--;
        return;
      }
      prev_node = curr_node;
      curr_node = curr_node.getNext();
    }
  }
}
