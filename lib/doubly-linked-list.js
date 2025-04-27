export class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this._size = 0
  }

  // Get the size of the list
  get size() {
    return this._size
  }

  // Check if the list is empty
  isEmpty() {
    return this._size === 0
  }

  // Add a node to the end of the list
  append(data) {
    const newNode = {
      data,
      prev: null,
      next: null,
    }

    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      if (this.tail) {
        this.tail.next = newNode
      }
      this.tail = newNode
    }

    this._size++
  }

  // Add a node to the beginning of the list
  prepend(data) {
    const newNode = {
      data,
      prev: null,
      next: null,
    }

    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      if (this.head) {
        this.head.prev = newNode
      }
      this.head = newNode
    }

    this._size++
  }

  // Insert a node at a specific position
  insertAt(data, position) {
    if (position < 0 || position > this._size) {
      return false
    }

    if (position === 0) {
      this.prepend(data)
      return true
    }

    if (position === this._size) {
      this.append(data)
      return true
    }

    const newNode = {
      data,
      prev: null,
      next: null,
    }

    let current = this.head
    let index = 0

    while (current && index < position) {
      current = current.next
      index++
    }

    if (current) {
      newNode.next = current
      newNode.prev = current.prev

      if (current.prev) {
        current.prev.next = newNode
      }

      current.prev = newNode
      this._size++
      return true
    }

    return false
  }

  // Remove a node from the list by value
  remove(callback) {
    if (this.isEmpty()) {
      return null
    }

    let current = this.head

    while (current) {
      if (callback(current.data)) {
        if (current === this.head && current === this.tail) {
          // Only one node in the list
          this.head = null
          this.tail = null
        } else if (current === this.head) {
          // Removing the head
          this.head = current.next
          if (this.head) {
            this.head.prev = null
          }
        } else if (current === this.tail) {
          // Removing the tail
          this.tail = current.prev
          if (this.tail) {
            this.tail.next = null
          }
        } else {
          // Removing a middle node
          if (current.prev) {
            current.prev.next = current.next
          }
          if (current.next) {
            current.next.prev = current.prev
          }
        }

        this._size--
        return current.data
      }

      current = current.next
    }

    return null
  }

  // Find a node in the list
  find(callback) {
    if (this.isEmpty()) {
      return null
    }

    let current = this.head

    while (current) {
      if (callback(current.data)) {
        return current.data
      }
      current = current.next
    }

    return null
  }

  // Update a node in the list
  update(callback, newData) {
    if (this.isEmpty()) {
      return false
    }

    let current = this.head

    while (current) {
      if (callback(current.data)) {
        current.data = newData
        return true
      }
      current = current.next
    }

    return false
  }

  // Convert the list to an array
  toArray() {
    const array = []
    let current = this.head

    while (current) {
      array.push(current.data)
      current = current.next
    }

    return array
  }

  // Sort the list using merge sort (returns a new sorted array)
  sort(compareFn) {
    const array = this.toArray()
    return this.mergeSort(array, compareFn)
  }

  mergeSort(array, compareFn) {
    if (array.length <= 1) {
      return array
    }

    const middle = Math.floor(array.length / 2)
    const left = array.slice(0, middle)
    const right = array.slice(middle)

    return this.merge(this.mergeSort(left, compareFn), this.mergeSort(right, compareFn), compareFn)
  }

  merge(left, right, compareFn) {
    const result = []
    let leftIndex = 0
    let rightIndex = 0

    while (leftIndex < left.length && rightIndex < right.length) {
      if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
        result.push(left[leftIndex])
        leftIndex++
      } else {
        result.push(right[rightIndex])
        rightIndex++
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
  }

  // Clear the list
  clear() {
    this.head = null
    this.tail = null
    this._size = 0
  }

  // Iterate through the list
  forEach(callback) {
    let current = this.head
    let index = 0

    while (current) {
      callback(current.data, index)
      current = current.next
      index++
    }
  }

  // Search for nodes that match a condition
  search(callback) {
    const results = []
    let current = this.head

    while (current) {
      if (callback(current.data)) {
        results.push(current.data)
      }
      current = current.next
    }

    return results
  }
}
