import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from "routing-controllers";

import { EntryNotFoundError } from "../../errors/omnia/EntryNotFoundError";
import { Entry } from "../../models/omnia/Entry";
import { EntryService } from "../../services/omnia/EntryService";

@JsonController("/omnia/entry")
export class EntryController {
    constructor(
        private entryService: EntryService
    ) { }

    @Get()
    public find(): Promise<Entry[]> {
        return this.entryService.find();
    }

    @Get("/filter/:keyword")
    public filter(@Param("keyword") keyword: string): Promise<Entry[] | undefined> {
        return this.entryService.filter(keyword);
    }

    @Get("/:key")
    @OnUndefined(EntryNotFoundError)
    public findOne(@Param("key") key: string): Promise<Entry | undefined> {
        return this.entryService.findOne(key);
    }

    @Post()
    public create(@Body() entry: Entry): Promise<Entry> {
        return this.entryService.create(entry);
    }

    @Put("/:key")
    public update(@Param("key") key: string, @Body() entry: Entry): Promise<Entry> {
        return this.entryService.update(key, entry);
    }

    @Delete("/:key")
    public delete(@Param("key") key: string): Promise<void> {
        return this.entryService.delete(key);
    }
}
