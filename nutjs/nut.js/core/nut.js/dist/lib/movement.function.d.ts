import { MovementApi } from "./movement-api.interface";
import { LineHelper } from "./util/linehelper.class";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";
export declare const createMovementApi: (providerRegistry: ProviderRegistry, lineHelper: LineHelper) => MovementApi;
