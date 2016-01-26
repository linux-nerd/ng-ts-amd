import {core} from "../module";
import {Directive} from "../../../decorators";

@Directive(core, "anchorDirective", {
    restrict: "E",
    template: `<a href="">This is a Link</a>`,
    replace: true
})
class Anchor {
    
    public link($scope, iEl, iAttr) {
        iEl.addClass("active");
    }
    
    public static factory(){
        let directive = () => new Anchor;
        directive["$inject"] = [];
        
        return directive;
    }
    
}