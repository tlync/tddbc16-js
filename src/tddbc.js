var Store = function(){
    this.init.apply(this, arguments);
};

Store.prototype = {
    storage: null,
    timestamp: null,

    init: function(){
        this.storage = {};
        this.timestamp = {};
    },

    get: function(key){
        if(this.isNullOrUndefined(key)){
            throw new Error('key argument must not be empty.');
        }
        return this.storage[key];
    },

    put: function(key, value){
        if(this.isNullOrUndefined(key)){
            throw new Error('key argument must not be empty.');
        }
        this.storage[key] = value;
        this.timestamp[key] = this.getCurrentDate();
    },

    putAll: function(items) {
        for(var k in items){
            var o = items[k];
            if(items.hasOwnProperty(k)){
                this.put(k, o);
            }
        }
    },

    dump: function(){
        return JSON.stringify(this.storage);
    },

    delete: function(key){
        if(this.isNullOrUndefined(key)){
            throw new Error('key argument must not be empty.');
        }

        var val = this.storage[key];
        if(val === null || val === undefined){
            return false;
        }else{
            this.storage[key] = undefined;
            return true;
        }
    },

    getCreatedAt: function(key){
        return this.timestamp[key];
    },

    isNullOrUndefined: function(val){
        return (val === null || val === undefined);
    },

    getCurrentDate: function(){
        return new Date();
    }
};
