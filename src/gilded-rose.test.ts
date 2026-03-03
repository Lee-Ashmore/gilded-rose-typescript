import { expect } from "chai";
import { tick } from "./gilded-rose";

describe("Gilded Rose", () => {
  describe("Normal Item", () => {
    it("before sell date", () => {
      const input = [{ name: "Normal Item", sellIn: 5, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 9);
    });

    it("on sell date", () => {
      const input = [{ name: "Normal Item", sellIn: 0, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 8);
    });

    it("after sell date", () => {
      const input = [{ name: "Normal Item", sellIn: -10, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 8);
    });

    it("of zero quality", () => {
      const input = [{ name: "Normal Item", sellIn: 5, quality: 0 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 0);
    });
  });

  describe("Aged Brie", () => {
    it("before sell date", () => {
      const input = [{ name: "Aged Brie", sellIn: 5, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 11);
    });

    it("with max quality", () => {
      const input = [{ name: "Aged Brie", sellIn: 5, quality: 50 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 50);
    });

    it("on sell date", () => {
      const input = [{ name: "Aged Brie", sellIn: 0, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 12);
    });

    it("on sell date near max quality", () => {
      const input = [{ name: "Aged Brie", sellIn: 0, quality: 49 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 50);
    });

    it("on sell date with max quality", () => {
      const input = [{ name: "Aged Brie", sellIn: 0, quality: 50 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 50);
    });

    it("after sell date", () => {
      const input = [{ name: "Aged Brie", sellIn: -10, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 12);
    });

    it("after sell date with max quality", () => {
      const input = [{ name: "Aged Brie", sellIn: -10, quality: 50 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 50);
    });
  });

  describe("Legendary Item (Sulfuras, Hand of Ragnaros)", () => {
    it("before sell date", () => {
      const input = [
        { name: "Sulfuras, Hand of Ragnaros", sellIn: 5, quality: 80 },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(5, 80);
    });

    it("on sell date", () => {
      const input = [
        { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(0, 80);
    });

    it("after sell date", () => {
      const input = [
        { name: "Sulfuras, Hand of Ragnaros", sellIn: -10, quality: 80 },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(-10, 80);
    });
  });

  describe("Backstage Pass", () => {
    it("long before sell date", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 11,
          quality: 10,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(10, 11);
    });

    it("long before sell date at max quality", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 11,
          quality: 50,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(10, 50);
    });

    it("medium close to sell date upper bound", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 10,
          quality: 10,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(9, 12);
    });

    it("medium close to sell date upper bound at max quality", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 10,
          quality: 50,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(9, 50);
    });

    it("medium close to sell date lower bound", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 6,
          quality: 10,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(5, 12);
    });

    it("medium close to sell date lower bound at max quality", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 6,
          quality: 50,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(5, 50);
    });

    it("very close to sell date upper bound", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 5,
          quality: 10,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 13);
    });

    it("very close to sell date upper bound at max quality", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 5,
          quality: 50,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 50);
    });

    it("very close to sell date lower bound", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 1,
          quality: 10,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(0, 13);
    });

    it("very close to sell date lower bound at max quality", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 1,
          quality: 50,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(0, 50);
    });

    it("on sell date", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 0,
          quality: 10,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 0);
    });

    it("after sell date", () => {
      const input = [
        {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: -10,
          quality: 10,
        },
      ];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 0);
    });
  });

  describe.skip("Conjured Item", () => {
    it("before sell date", () => {
      const input = [{ name: "Conjured Mana Cake", sellIn: 5, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 8);
    });

    it("before sell date at zero quality", () => {
      const input = [{ name: "Conjured Mana Cake", sellIn: 5, quality: 0 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(4, 0);
    });

    it("on sell date", () => {
      const input = [{ name: "Conjured Mana Cake", sellIn: 0, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 6);
    });

    it("on sell date at zero quality", () => {
      const input = [{ name: "Conjured Mana Cake", sellIn: 0, quality: 0 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-1, 0);
    });

    it("after sell date", () => {
      const input = [{ name: "Conjured Mana Cake", sellIn: -10, quality: 10 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 6);
    });

    it("after sell date at zero quality", () => {
      const input = [{ name: "Conjured Mana Cake", sellIn: -10, quality: 0 }];
      expect(tick(input)[0]).toMatchSellInAndQuality(-11, 0);
    });
  });
});
