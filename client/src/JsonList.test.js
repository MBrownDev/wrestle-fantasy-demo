import { render } from "@testing-library/react"
import JsonList from './JsonList'

describe(JsonList, () => {
    it("displays list count", () => {
        const { getByTestId, getByRole } = render(<JsonList list={[]} />);
        const countValue = Number(getByTestId("count").textContent);
        expect(countValue).toEqual(0)
    })
});