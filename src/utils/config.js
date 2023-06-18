import Cookies from 'js-cookie';

export function get () {
    return Cookies.get('hb_lang')
}

export function set (data) {
    localStorage.setItem('lang', data);
    return Cookies.set('hb_lang', data)
}

export function remove () {
    localStorage.removeItem('lang', data);
    return Cookies.remove('hb_lang')
}
