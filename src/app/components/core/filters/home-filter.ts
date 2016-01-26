import {core} from "../module";
import {Filter} from "../../../decorators";

    
    
@Filter(core, "home")
class Home {
    public filter(text: string) {
        return `${text}(filtered)`;
    }
}