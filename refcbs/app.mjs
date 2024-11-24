const cachedDeps = {};

function depsAreUpdated(key, deps) {
    if (!deps?.length) {
        return true;
    }

    const beforeDeps = cachedDeps[key];
    const isDifferent = !cachedDeps[key] || deps.some((r, index) => beforeDeps[index] !== r);
    cachedDeps[key] = deps;
    return isDifferent;
}

const cbCache = {};
function useCallback(cb, deps) {
    if (!cbCache.current || depsAreUpdated(cb, deps)) {
        cbCache.current = cb;
    }

    return cbCache.current;
}

function useRef(v) {
    return {
        current: v,
    }
}

// TODO: How do I store many?
// TODO: This and useCallback are effectively identical
const effectCache = {};
function useEffect(cb, deps) {
    if (!effectCache.current || depsAreUpdate(cb, deps)) {
        effectCache.current =  cb;
    }

    return effectCache.current;
}

function useState() {
    // TODO
    return [];
}

const memoCache = {};
function memo(Comp, isEqual) {
    // TODO
}

function Input({ value, onChange }) {
    // TODO
}

function HeavyComponent({ onClick, title }) {
    // TODO
}

function createElement(comp, props) {
    // TODO
}

function MyComponent() {
    const ref = useRef(v);
    const [value, setValue] = useState();
    const onClick = useCallback(() => {
        ref.current();
    });;

    useEffect(() => {
        ref.current = () => {
            console.log('Current Value: ', value);
        }
    });

    return {
        createElement(Input, {
            value,
            onChange: (e) => setValue(e.target.value)
        }),
        createElement(HeavyComponent, {
            onClick,
            title: 'My Title',
        }),
    };
}

