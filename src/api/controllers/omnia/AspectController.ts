import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from "routing-controllers";

import { AspectNotFoundError } from "../../errors/omnia/AspectNotFoundError";
import { Aspect } from "../../models/omnia/Aspect";
import { AspectService } from "../../services/omnia/AspectService";

@JsonController("/omnia/aspect")
export class AspectController {
    constructor(
        private aspectService: AspectService
    ) { }

    @Get()
    public find(): Promise<Aspect[]> {
        return this.aspectService.find();
    }

    @Get("/:key")
    @OnUndefined(AspectNotFoundError)
    public findOne(@Param("key") key: string): Promise<Aspect | undefined> {
        return this.aspectService.findOne(key);
    }

    @Post()
    public create(@Body() aspect: Aspect): Promise<Aspect> {
        return this.aspectService.create(aspect);
    }

    @Put("/:key")
    public update(@Param("key") key: string, @Body() aspect: Aspect): Promise<Aspect> {
        return this.aspectService.update(key, aspect);
    }

    @Delete("/:key")
    public delete(@Param("key") key: string): Promise<void> {
        return this.aspectService.delete(key);
    }
}
