import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from "routing-controllers";

import { EnumerationNotFoundError } from "../../errors/omnia/EnumerationNotFoundError";
import { Enumeration } from "../../models/omnia/Enumeration";
import { EnumerationService } from "../../services/omnia/EnumerationService";

@JsonController("/omnia/enumeration")
export class EnumerationController {
    constructor(
        private enumerationService: EnumerationService
    ) { }

    @Get()
    public find(): Promise<Enumeration[]> {
        return this.enumerationService.find();
    }

    @Get("/:key")
    @OnUndefined(EnumerationNotFoundError)
    public findOne(@Param("key") key: string): Promise<Enumeration | undefined> {
        return this.enumerationService.findOne(key);
    }

    @Post()
    public create(@Body() enumeration: Enumeration): Promise<Enumeration> {
        return this.enumerationService.create(enumeration);
    }

    @Put("/:key")
    public update(@Param("key") key: string, @Body() enumeration: Enumeration): Promise<Enumeration> {
        return this.enumerationService.update(key, enumeration);
    }

    @Delete("/:key")
    public delete(@Param("key") key: string): Promise<void> {
        return this.enumerationService.delete(key);
    }
}
