import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";
import counter from "../counter";

@suite
export class CounterTests {
  @test "first function should return 0 when no value is passed"() {
    const [getA] = counter();

    expect(getA()).to.eq(0);
  }

  @test "second function should always return null"() {
    const [getA, nextA] = counter(1);
    expect(getA()).to.eq(1);
    expect(nextA()).to.be.undefined;
  }

  @test
  "first function should always increment when second function is called"() {
    const [getA, nextA] = counter(1);
    expect(getA()).to.eq(1);
    nextA();
    expect(getA()).to.eq(2);
  }

  @test
  "multiple calls of counter function create independent instances of counter"() {
    const [getA, nextA] = counter(1);
    expect(getA()).to.eq(1);
    nextA();
    expect(getA()).to.eq(2);

    const [getB, nextB] = counter(10);
    nextB();
    expect(getA()).to.eq(2);
    expect(getB()).to.eq(11);

    nextA();
    expect(getA()).to.eq(3);
    expect(getB()).to.eq(11);
  }
}
