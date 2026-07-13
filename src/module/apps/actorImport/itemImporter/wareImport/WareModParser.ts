import { BlankItem, ExtractItemType, Parser } from "../Parser";
import { parseChummerCapacitySlots, parseChummerDecimal } from "../ChummerNumberParser";

type WareType = 'bioware' | 'cyberware';

export class WareModParser extends Parser<'modification'> {
    protected readonly parseType = 'modification';
    protected wareType: WareType;

    constructor(wareType: WareType) {
        super();
        this.wareType = wareType;
    }

    protected parseItem(item: BlankItem<'modification'>, itemData: ExtractItemType<'cyberwares', 'cyberware'>) {
        const system = item.system;

        system.type = 'ware';
        system.technology.equipped = true;
        system.essence = parseChummerDecimal(itemData.ess);
        system.slots = parseChummerCapacitySlots(itemData.capacity, system.technology.rating);

        if (this.wareType === 'bioware') {
            system.technology.wireless = 'none';
        }
    }
}
