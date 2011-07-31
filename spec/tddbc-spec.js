describe('TDDBC', function(){

    var store;
    beforeEach(function(){
        store = new Store();
    });

    describe('get', function(){
        it('キーに対応した値が取得できる', function(){
            store.put('key1', 'value1');
            expect(store.get('key1')).toEqual('value1');
        });

        it('存在していないキーの場合、undefined が返る', function(){
            expect(store.get("key3")).toBeUndefined();
        });

        it('キーに null を渡した時、例外を返す', function(){
            var get = function(){
                store.get(null);
            };
            expect(get).toThrow();
        });

        it('キーに undefined を渡した時、例外を返す', function(){
            var get = function(){
                store.get(undefined);
            };
            expect(get).toThrow();
        });
    });

    xdescribe('clear', function(){
        it('すべての key,value を削除できる', function(){
            store.clear();
            expect(store.get('key1')).toEqual('value1');
        });
    });

    xdescribe('size', function(){
        it('存在するキーの数を返す', function(){
            store.put('key1', 'value1');
            store.put('key2', 'value2');
            store.put('key3', 'value3');
            expect(store.size()).toEqual(3);
        });
    });

    describe('put', function(){
        it('キーと値のセットが登録できる', function(){
            store.put("key4","value4");
            expect(store.get("key4")).toEqual("value4");
        });

        it('存在するキーを指定した場合、上書きできる', function(){
            store.put("key5","value5");
            expect(store.get("key5")).toEqual("value5");
            store.put("key5","value6");
            expect(store.get("key5")).toEqual("value6");
        });

        it('キーに null を渡した時、例外を返す', function(){
            var put = function(){
                store.put(null, 'hoge');
            };
            expect(put).toThrow();
        });

        it('キーに undefined を渡した時、例外を返す', function(){
            var put = function(){
                store.put(undefined, 'hoge');
            };
            expect(put).toThrow();
        });

        it("複数のkeyとvalueを一括で追加する", function() {
            store.putAll({
                key1: 'value1',
                key2:"value2",
                key3:"value3",
                nanika:"nandaro"
            });

            expect(store.get("key1")).toEqual("value1");
            expect(store.get("key2")).toEqual("value2");
            expect(store.get("key3")).toEqual("value3");
            expect(store.get("nanika")).toEqual("nandaro");
        });
    });

    describe('getCreatedAt', function(){
        it('登録したアイテムの登録日時が取得できる', function(){
            store.put('key1', 'value1');
            var ts = store.getCreatedAt('key1');
            expect(ts instanceof Date).toBeTruthy();
        });

        it('指定したアイテムが存在しない場合、undefined が返る', function(){
            expect(store.getCreatedAt('key1')).toBeUndefined();
        });
    });

    describe('putAll', function(){
        it ("一括登録時、重複した key がある場合、最後の値が優先される", function() {
            store.putAll({
                key1: 'first',
                key2: "second",
                key1: "last"
            });

            expect(store.get("key1")).toEqual("last");
            expect(store.get("key2")).toEqual("second");
        });

        it ("一括登録時、キーが存在したら上書きされる", function() {
            store.put('key2', 'put');
            expect(store.get("key2")).toEqual("put");

            store.putAll({
                key1: 'value1',
                key2: "updated",
                key3: "value3",
                key4: null,
                key5: undefined
            });
            expect(store.get("key1")).toEqual("value1");
            expect(store.get("key2")).toEqual("updated");
            expect(store.get("key3")).toEqual("value3");
            expect(store.get("key4")).toEqual(null);
            expect(store.get("key5")).toEqual(undefined);
        });
    });

    describe('dump', function(){
        it('登録されているすべての key,value の JSON 文字列を返す', function(){
            var expected = JSON.stringify({
                key1: 'value1',
                key2: 'value2'
            });
            store.put('key1', 'value1');
            store.put('key2', 'value2');
            expect(store.dump()).toEqual(expected);
        });

        it('登録日時でソートされている', function(){
            var expected = JSON.stringify({
                key1: 'value1',
                key2: 'value2'
            });
            store.put('key1', 'value1');
            store.put('key2', 'value2');
            expect(store.dump()).toEqual(expected);
        });
    });

    describe('delete', function() {
        it('キーを指定登録されたkey,valueが削除できる', function(){
            store.put("key1", "value1");
            var result = store.delete("key1");
            expect(result).toBeTruthy();
            expect(store.get("key1")).toBeUndefined();
        });

        it('指定したキーが存在しなかったら何もしない', function(){
            store.delete("key1");
            expect(store.get("key1")).toBeUndefined();
        });

        it('キーが null だったら例外が発生する', function(){
            var del = function(){
                store.delete(null);
            };
            expect(del).toThrow();
        });

        it('キーが undefined だったら例外が発生する', function(){
            var del = function(){
                store.delete(undefined);
            };
            expect(del).toThrow();
        });

    });

});
