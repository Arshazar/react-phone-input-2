class Utils {
    toPersianDigits(str = '') {
        const faNum = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(str).replace(/[0-9]/g, function (w) {
            return faNum[+w];
        });
    }
    toEnglishDigits = (str) => {
        if (str === 'undefined' || typeof str === 'undefined') return '';
        // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
        let e = '۰'.charCodeAt(0);

        str = str.replace(/[۰-۹]/g, (t) => {
            return String(t.charCodeAt(0) - e);
        });
        // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
        e = '٠'.charCodeAt(0);
        str = str.replace(/[٠-٩]/g, (t) => {
            return String(t.charCodeAt(0) - e);
        });
        return str;
    };
}

const utils = new Utils();
export { utils };
