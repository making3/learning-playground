import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/**
 * Example originates from:
 * https://www.advanced-react.com/examples/08/05
 */

// store the state here
const ContextData = React.createContext({ isNavExpanded: false });
// store the open/close functions here
const ContextApi = React.createContext({ open: () => {}, close: () => {} });

const NavigationController = ({ children }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const open = useCallback(() => setIsNavExpanded(true), []);

  // no dependencies, close won't change
  const close = useCallback(() => setIsNavExpanded(false), []);

  // that one has a dependency on state
  const data = useMemo(() => ({ isNavExpanded }), [isNavExpanded]);

  // that one never changes - no dependencies
  const api = useMemo(() => ({ open, close }), [close, open]);

  return (
    <ContextData.Provider value={data}>
      <ContextApi.Provider value={api}>{children}</ContextApi.Provider>
    </ContextData.Provider>
  );
};

const useNavigationData = () => useContext(ContextData);
const useNavigationApi = () => useContext(ContextApi);

const AdjustableColumnsBlock = () => {
  const { isNavExpanded } = useNavigationData();
  return isNavExpanded ? (
    <div>two block items here</div>
  ) : (
    <div>three block items here</div>
  );
};

const SomeComponent = () => {
  const { open } = useNavigationApi();

  useEffect(() => {
    console.info(
      "SomeComponent won't re-render on navigation expand/collapse, even though it uses Context"
    );
  });

  return (
    <div>
      <button onClick={open}>Expand nav (open())</button>
    </div>
  );
};

function VerySlowComponent() {
  console.log('[VerySlowComponent] I am slow component re-rendering');
  return null;
}
function AnotherVerySlowComponent() {
  console.log(
    '[AnotherVerySlowComponent] I am another slow component re-rendering'
  );
  return null;
}

const MainPart = () => {
  return (
    <>
      <SomeComponent />
      <VerySlowComponent />
      <AnotherVerySlowComponent />
      <AdjustableColumnsBlock />
    </>
  );
};

const ExpandButton = () => {
  const { isNavExpanded } = useNavigationData();
  const { open, close } = useNavigationApi();

  useEffect(() => {
    console.info(
      "Button that uses Context data re-renders. But SomeComponent won't"
    );
  });

  return (
    <button onClick={() => (isNavExpanded ? close() : open())}>
      {isNavExpanded ? 'collapse <' : 'expand >'}
    </button>
  );
};

const SidebarLayout = ({ children }) => {
  const { isNavExpanded } = useNavigationData();
  return (
    <div className="left" style={{ flexBasis: isNavExpanded ? '50%' : '20%' }}>
      {children}
    </div>
  );
};

const Sidebar = () => {
  return (
    <SidebarLayout>
      {/* this one will control the expand/collapse */}
      <ExpandButton />

      <ul>
        <li>
          <a href="#">some links</a>
        </li>
      </ul>
    </SidebarLayout>
  );
};

const Layout = ({ children }) => {
  const [, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY);
    });
  }, []);

  return (
    <NavigationController>
      <div className="three-layout">{children}</div>
    </NavigationController>
  );
};

const Page = () => {
  return (
    <Layout>
      <Sidebar />
      <MainPart />
    </Layout>
  );
};
export default function NoToggle() {
  return <Page />;
}

NoToggle.title = 'No Toggle (Only open/close)';
