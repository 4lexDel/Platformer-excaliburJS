import {
  Actor,
  BaseAlign,
  BoundingBox,
  CollisionType,
  Color,
  CompositeCollider,
  EdgeCollider,
  Label,
  Scene,
  TextAlign,
  vec,
} from "excalibur";
import { Coin } from "../actors/COin";
import { LevelTransition } from "../actors/LevelTransition";
import { MovingPlatform } from "../actors/MovingPlatform";
import { Player } from "../actors/Player";

export default class BaseScene extends Scene {
  transitionWidth = 5;
  transitionMargin = 15;

  tilemap = null;
  entityFactory = {
    /* Level transition */
    LevelTransition: (props) => {
      console.log(props.object);
      return new LevelTransition({
        x: props.object?.properties.get('direction') === "right" ? this.totalWidth : 0,
        y: props.object?.y ?? -1000,
        z: props.layer.order ?? 0,
        width: this.transitionWidth,
        height: 3000,
      }, props.object?.properties.get('targetlevel'));
    },

    /* Player */
    Player: (props) => {
      const player = new Player({
        x: props.object?.x ?? 0,
        y: props.object?.y ?? 0,
        z: props.layer.order ?? 0,
      });

      this.player = player;

      return player;
    },

    /* Items */
    Coin: (props) => {
      return new Coin({
        x: props.object?.x ?? 0,
        y: props.object?.y ?? 0,
        z: props.layer.order ?? 0,
      });
    },

    /* Platforms */
    MovingPlatform: (props) => {
      const x = props.object?.x ?? 0
      const y = props.object?.y ?? 0

      return new MovingPlatform(
        {
          x,
          y,
          z: props.layer.order ?? 0,
          width: props.object?.properties.get('width'),
          height: props.object?.properties.get('height'),
        },
        props.object?.properties.get('type'),
        (actions) => {
          const speed = (props.object?.properties.get('speed')) ?? 30;
          const pathObjectId = props.object?.properties.get('path');

          // props.layer is lacking types for tiledObjectLayer
          const pathObject = props.layer.tiledObjectLayer.objects.find((obj) => obj.id === pathObjectId);

          actions.repeatForever((ctx) =>
            ctx
              .moveTo(vec(pathObject.x, pathObject.y), speed)
              .moveTo(vec(x, y), speed)
          )
        }
      )
    },

    /* UI */
    Text: (props) => {
      const text = props.object?.tiledObject?.text?.text ?? "";
      const size = props.object?.tiledObject?.text?.pixelsize ?? 16;
      const width = props.object?.tiledObject?.width ?? 100;
      const height = props.object?.tiledObject?.height ?? 100;
      const x = props.object?.x ?? 0;
      const y = props.object?.y ?? 0;

      const textAlign = (() => {
        switch (props.object?.tiledObject?.text?.halign) {
          case "center":
            return TextAlign.Center;
          case "right":
            return TextAlign.Right;
          default:
            return TextAlign.Left;
        }
      })();

      const baseAlign = (() => {
        switch (props.object?.tiledObject?.text?.valign) {
          case "center":
            return BaseAlign.Middle;
          case "bottom":
            return BaseAlign.Bottom;
          default:
            return BaseAlign.Top;
        }
      })();

      const label = new Label({
        x,
        y,
        text,
        width,
        height,
        font: Resources.fonts.round.toFont({
          size: size,
          color: Color.White,
          textAlign,
          baseAlign,
          shadow: {
            blur: 2,
            offset: vec(2, 2),
            color: Color.Black,
          },
        }),
        z: props.layer.order ?? 0,
      });

      return label;
    },
  };

  constructor(args) {
    super();
    this.tilemap = args.tilemap;

    this.totalWidth = this.tilemap.map.width * this.tilemap.map.tilewidth;
    this.totalHeight = this.tilemap.map.height * this.tilemap.map.tileheight;
    // this.song = args.song
    for (const [className, factory] of Object.entries(this.entityFactory)) {
      this.tilemap.registerEntityFactory(className, factory);
    }
  }

  onActivate() {
    if (this.player) {
      if (this.player.pos.x >= this.totalWidth-this.transitionMargin) {
        this.player.pos.x = this.totalWidth - this.transitionMargin;
        this.player.facing = "left";
      }
      else if (this.player.pos.x <= this.transitionMargin) {
        this.player.pos.x = this.transitionMargin;
        this.player.facing = "right";
      }
    }
  }

  onInitialize() {
    this.tilemap.addToScene(this);

    // this.add(new LevelOverlay())   // Display score

    // this.setupCollisionGroups()    // Advanced collision behaviours...
    this.setupCamera();
    this.setupWorldBounds();

    // this.setupOneWayPlatforms();
  }

  setupCamera() {
    // set camera to follow player
    const player = this.entities.find((e) => e instanceof Player);
    this.camera.strategy.lockToActor(player);
    this.camera.zoom = 1.8;
    this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, this.totalWidth, this.totalHeight));
    // this.camera.addStrategy(new LockCameraToActorStrategy(player));

    // @ts-expect-error - temporary to prioritize lockToActor over tilemap strategy
    // this.camera._cameraStrategies.reverse();
  }

  setupWorldBounds() {
    const offset = 0;
    const bounds = new Actor({
      collisionType: CollisionType.Fixed,
      collider: new CompositeCollider([
        new EdgeCollider({
          begin: vec(-offset, -offset),
          end: vec(-offset, this.totalHeight+offset),
        }),
        new EdgeCollider({
          begin: vec(-offset, this.totalHeight+offset),
          end: vec(this.totalWidth+offset, this.totalHeight+offset),
        }),
        new EdgeCollider({
          begin: vec(this.totalWidth+offset, this.totalHeight+offset),
          end: vec(this.totalWidth+offset, offset),
        }),
        new EdgeCollider({
          begin: vec(this.totalWidth+offset, +offset),
          end: vec(-offset, -offset),
        }),
      ]),
    });

    // create world bounds
    this.engine.add(bounds);
  }
}
