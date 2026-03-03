declare global {
  namespace Chai {
    interface Assertion {
      toMatchSellInAndQuality(sellIn: number, quality: number): Assertion;
    }
  }
}

export function InventoryCheck(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) {
  chai.Assertion.addMethod(
    "toMatchSellInAndQuality",
    function (sellIn: number, quality: number) {
      const obj = this._obj;
      const receivedValues = `[sellIn: ${obj.sellIn}, quality: ${obj.quality}]`;
      const expectedValues = `[sellIn: ${sellIn}, quality: ${quality}]`;
      const comparison = `\n  Received ${receivedValues}\n  Expected ${expectedValues}`;
      this.assert(
        obj.sellIn === sellIn && obj.quality === quality,
        `expected values to match:${comparison}`,
        `expected values not to match:${comparison}`,
      );
    },
  );
}
