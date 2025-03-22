import * as ex from 'excalibur'
import { Actor, CollisionType, vec } from 'excalibur'
import { OneWayCollisionComponent } from '../components/physics/one-way-platform'

export class FixedPlatform extends Actor {
  constructor(args) {
    super({
      collisionType: CollisionType.Fixed,
      anchor: vec(0, 0),
      ...args,
    })

    this.addComponent(new OneWayCollisionComponent())
  }
}
