import { Component } from "excalibur"

/**
 * Represents an entity that can be picked up by the player
 */
export class CollectableComponent extends Component {
  isCollected = false
  isCollectable = true
}
