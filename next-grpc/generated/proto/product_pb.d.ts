import * as jspb from 'google-protobuf'



export class VoidParam extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VoidParam.AsObject;
  static toObject(includeInstance: boolean, msg: VoidParam): VoidParam.AsObject;
  static serializeBinaryToWriter(message: VoidParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VoidParam;
  static deserializeBinaryFromReader(message: VoidParam, reader: jspb.BinaryReader): VoidParam;
}

export namespace VoidParam {
  export type AsObject = {
  }
}

export class ProductId extends jspb.Message {
  getId(): number;
  setId(value: number): ProductId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductId.AsObject;
  static toObject(includeInstance: boolean, msg: ProductId): ProductId.AsObject;
  static serializeBinaryToWriter(message: ProductId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductId;
  static deserializeBinaryFromReader(message: ProductId, reader: jspb.BinaryReader): ProductId;
}

export namespace ProductId {
  export type AsObject = {
    id: number,
  }
}

export class ProductItem extends jspb.Message {
  getId(): number;
  setId(value: number): ProductItem;

  getName(): string;
  setName(value: string): ProductItem;

  getDescription(): string;
  setDescription(value: string): ProductItem;

  getPrice(): number;
  setPrice(value: number): ProductItem;

  getCategory(): Category;
  setCategory(value: Category): ProductItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductItem.AsObject;
  static toObject(includeInstance: boolean, msg: ProductItem): ProductItem.AsObject;
  static serializeBinaryToWriter(message: ProductItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductItem;
  static deserializeBinaryFromReader(message: ProductItem, reader: jspb.BinaryReader): ProductItem;
}

export namespace ProductItem {
  export type AsObject = {
    id: number,
    name: string,
    description: string,
    price: number,
    category: Category,
  }
}

export class ProductItems extends jspb.Message {
  getProductsList(): Array<ProductItem>;
  setProductsList(value: Array<ProductItem>): ProductItems;
  clearProductsList(): ProductItems;
  addProducts(value?: ProductItem, index?: number): ProductItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductItems.AsObject;
  static toObject(includeInstance: boolean, msg: ProductItems): ProductItems.AsObject;
  static serializeBinaryToWriter(message: ProductItems, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductItems;
  static deserializeBinaryFromReader(message: ProductItems, reader: jspb.BinaryReader): ProductItems;
}

export namespace ProductItems {
  export type AsObject = {
    productsList: Array<ProductItem.AsObject>,
  }
}

export class DeleteProductResponse extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): DeleteProductResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteProductResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteProductResponse): DeleteProductResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteProductResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteProductResponse;
  static deserializeBinaryFromReader(message: DeleteProductResponse, reader: jspb.BinaryReader): DeleteProductResponse;
}

export namespace DeleteProductResponse {
  export type AsObject = {
    deleted: boolean,
  }
}

export enum Category { 
  SMARTPHONE = 0,
  CAMERA = 1,
  LAPTOPS = 2,
  HEADPHONES = 3,
  CHARGERS = 4,
  SPEAKERS = 5,
  TELEVISIONS = 6,
  MODEMS = 7,
  KEYBOARDS = 8,
  MICROPHONES = 9,
}
