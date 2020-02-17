import BasePage from "./BasePage";
import selectors from "../selectors";


export default class GooglePage extends BasePage{
    constructor(page, browser) {
        super(page, browser);
        this.selectors = selectors.googleSearch;
    }
}