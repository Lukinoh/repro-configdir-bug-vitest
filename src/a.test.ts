import { expect, test } from 'vitest/dist/index.js'
import {Length} from "class-validator";
import {validateSync} from "class-validator";

class AEntity {
    @Length(1, 2)
    title: string;
}

test('some validation a', () => {
    const anEntity = new AEntity();
    anEntity.title = "2313";

    const res = validateSync(anEntity)

    expect(res).not.toBe([])
})
