// jinq.js
// created: 2012-09-18
// author: Loek van den Ouweland2

Array.prototype.Where = function (body) {
    var list = [];
    var criterium = createJinqFunction(body);
    for (var i = 0; i < this.length; i += 1) {
        if (criterium(this[i])) {
            list.push(this[i]);
        }
    }
    return list;
}

Array.prototype.FirstOrDefault = function (body) {
    var criterium = createJinqFunction(body);
    for (var i = 0; i < this.length; i += 1) {
        if (criterium(this[i])) {
            return this[i];
        }
    }
    return null;
}

Array.prototype.Select = function (body) {
    var list = [];
    var selecter = createJinqFunction(body);
    for (var i = 0; i < this.length; i += 1) {
        var item = selecter(this[i]);
        list.push(item);
    }
    return list;
}

Array.prototype.SelectMany = function (body) {
    var list = [];
    var selecter = createJinqFunction(body);
    for (var i = 0; i < this.length; i += 1) {
        var sublist = selecter(this[i]);
        {
            for (var j = 0; j < sublist.length; j++) {
                list.push(sublist[j]);
            }
        }
    }
    return list;
}

Array.prototype.OrderBy = function (body) {
    var sortMethod = createJinqFunction(body);
    this.sort(function (a, b) {
        return sortMethod(a) - sortMethod(b)
    });

    return this;
}

Array.prototype.Count = function (body) {
    var list = this.Where(body);
    return list.length;
}

Array.prototype.Exists = function (body) {
    var list = [];
    var selecter = createJinqFunction(body);
    for (var i = 0; i < this.length; i += 1) {
        var item = selecter(this[i]);
        if (item)
            return true;
    }
    return false;
}

Array.prototype.Distinct = function (body) {
    var list = [];
    var selecter = createJinqFunction(body);
    for (var i = 0; i < this.length; i += 1) {
        var exists = false;
        var item = selecter(this[i]);

        for (var j = 0; j < list.length; j += 1) {
            var testitem = list[j];

            if (testitem === item)
                exists = true;
        }

        if (!exists || list.length === 0) {
            list.push(item);
        }
    }
    return list;
}

Array.prototype.Foreach = function (body) {
    var processor = createJinqFunction(body);
    for (var i = 0; i < this.length; i += 1) {
        processor(this[i]);
    }

    return this;
}

Array.prototype.Take = function (count) {
    var length = count;
    var list = [];
    var selecter = createJinqFunction("x");

    if (length > this.length) {
        length = this.length;
    }
    for (var i = 0; i < length; i += 1) {
        list.push(this[i]);
    }
    return list;
}

Array.prototype.Remove = function (body) {
    var list = [];
    var selecter = createJinqFunction(body);
    for (var i = 0; i < this.length; i += 1) {
        var item = selecter(this[i]);

        if (!item) {
            list.push(this[i]);
        }
    }

    return list;
}

Array.prototype.Max = function (body) {
    var list = [];
    var getvalue = createJinqFunction(body);
    var max = null;
    for (var i = 0; i < this.length; i += 1) {
        var current = getvalue(this[i]);
        if (max === null || current > max)
            max = current;
    }
    return max;
}

Array.prototype.Min = function (body) {
    var list = [];
    var getvalue = createJinqFunction(body);
    var val = null;
    for (var i = 0; i < this.length; i += 1) {
        var current = getvalue(this[i]);
        if (val === null || current < val)
            val = current;
    }
    return val;
}

Array.prototype.Sum = function (body) {
    var sumMethod = createJinqFunction(body);
    var total = 0.0;
    for (var i = 0; i < this.length; i += 1) {
        total = total + sumMethod(this[i]);
    }
    return total;
}

Array.prototype.Average = function (body) {
    var sumMethod = createJinqFunction(body);
    var total = 0.0;
    for (var i = 0; i < this.length; i += 1) {
        total = total + sumMethod(this[i]);
    }
    return total / this.length;
}

Array.prototype.Dump = function (body) {
    var list = [];
    var selecter = createJinqFunction(body);
    for (var i = 0; i < this.length; i += 1) {
        console.log("" + selecter(this[i]));
    }
    return list;
}

Object.prototype.ToList = function () {
    var list = [];
    list.push(this);
    return list;
}

Object.prototype.ToString = function (separator) {
    var list = "";
    for(var i=0; i<this.length; i+=1){
        list += this[i];
        if (i<this.length-1){
            list += separator;
        }
    }
    return list;
}

function createJinqFunction(body) {
    return new Function("x", "return " + body);
}
