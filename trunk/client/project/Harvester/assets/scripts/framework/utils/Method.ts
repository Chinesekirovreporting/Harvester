export class Method {

    public func:Function;
    public thisObj:any;
    public args:Array<any>

    public constructor($func:Function, $thisObj:any, $args?:Array<any>) {
        this.func = $func
        this.thisObj = $thisObj;
        this.args = $args;
    }

    public apply():any {
        return this.func.apply(this.thisObj, this.args);
    }
    
    public applyWith(data:Array<any>):any {
        return this.func.apply(this.thisObj, this.args != null ? this.args.concat(data) : data);
    }

    public clear():void {
        this.func = null;
        this.args = null;
    }
}