import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextareaAutoSize from 'react-textarea-autosize';
import Icon from 'components/Icon';
import Overlay from 'components/Overlay';
import Tooltip from 'components/Tooltip';

const propTypes = {
  /**
   * A set of input props passed directly to `react-textarea-autosize`'s component.
   */
  inputProps: PropTypes.object,
  /**
   * A set of AttachButton props
   */
  attachButtonProps: PropTypes.object,
  /**
   * A set of SendButton props
   */
  sendButtonProps: PropTypes.object,
  /** Set it will disabled `inputProps` */
  children: PropTypes.any,
};
const defaultProps = {
  inputProps: {},
  attachButtonProps: {
    icon: 'attach',
    tooltip: null,
    isDisabled: false,
  },
  sendButtonProps: {
    icon: 'send',
    tooltip: null,
    isDisabled: false,
    isActive: false,
  },
};

const Composer = React.forwardRef(
  (
    {
      className,
      children,
      inputProps,
      attachButtonProps,
      sendButtonProps,
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    const attachButtonConfigs = {
      icon: defaultProps.attachButtonProps.icon,
      tooltip: defaultProps.attachButtonProps.tooltip,
      isDisabled: defaultProps.attachButtonProps.isDisabled,
      ...attachButtonProps,
    };
    const sendButtonConfigs = {
      icon: defaultProps.sendButtonProps.icon,
      tooltip: defaultProps.sendButtonProps.tooltip,
      isDisabled: defaultProps.sendButtonProps.isDisabled,
      isActive: defaultProps.sendButtonProps.isActive,
      ...sendButtonProps,
    };
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'Composer',
          'u-flex u-alignItemsEnd u-borderTop u-paddingTiny',
          className && className,
        )}
      >
        {!attachButtonConfigs?.isDisabled && (
          <div className="u-flexShrink0 u-marginRightTiny">
            {attachButtonConfigs?.tooltip ? (
              <Overlay.Trigger
                placement="top-start"
                delay={{ show: 500, hide: 0 }}
                overlay={(props) => (
                  <Tooltip id="tooltip-attachButton" {...props}>
                    {typeof attachButtonConfigs?.tooltip === 'function'
                      ? attachButtonConfigs?.tooltip()
                      : attachButtonConfigs?.tooltip}
                  </Tooltip>
                )}
              >
                <div
                  {...attachButtonConfigs}
                  className={classNames(
                    'hover:u-backgroundPrimary hover:u-textWhite u-roundedMedium u-flex u-alignItemsCenter u-justifyContentCenter u-cursorPointer',
                    attachButtonConfigs.className &&
                      attachButtonConfigs.className,
                  )}
                  style={{
                    width: 42,
                    height: 42,
                    ...attachButtonConfigs.style,
                  }}
                >
                  {typeof attachButtonConfigs.icon === 'function' ? (
                    attachButtonConfigs.icon()
                  ) : (
                    <Icon name={attachButtonConfigs.icon} />
                  )}
                </div>
              </Overlay.Trigger>
            ) : (
              <div
                {...attachButtonConfigs}
                className={classNames(
                  'hover:u-backgroundPrimary hover:u-textWhite u-roundedMedium u-flex u-alignItemsCenter u-justifyContentCenter u-cursorPointer',
                  attachButtonConfigs.className &&
                    attachButtonConfigs.className,
                )}
                style={{
                  width: 42,
                  height: 42,
                  ...attachButtonConfigs.style,
                }}
              >
                {typeof attachButtonConfigs.icon === 'function' ? (
                  attachButtonConfigs.icon()
                ) : (
                  <Icon name={attachButtonConfigs.icon} />
                )}
              </div>
            )}
          </div>
        )}
        {children || (
          <TextareaAutoSize
            {...inputProps}
            className={classNames(
              'u-widthFull u-paddingVerticalExtraSmall u-border u-borderTransparent u-textPlaceholder',
              inputProps.className && inputProps.className,
            )}
            style={{
              resize: 'none',
              ...inputProps.style,
            }}
          />
        )}
        {!sendButtonConfigs.isDisabled &&
          (sendButtonConfigs?.tooltip ? (
            <Overlay.Trigger
              placement="top-end"
              delay={{ show: 500, hide: 0 }}
              overlay={(props) => (
                <Tooltip id="tooltip-sendButton" {...props}>
                  {typeof sendButtonConfigs.tooltip === 'function'
                    ? sendButtonConfigs.tooltip()
                    : sendButtonConfigs.tooltip}
                </Tooltip>
              )}
            >
              <div
                {...sendButtonConfigs}
                className={classNames(
                  'u-roundedMedium u-flex u-alignItemsCenter u-justifyContentCenter u-flexShrink0 u-marginLeftTiny',
                  sendButtonConfigs.isActive
                    ? 'hover:u-backgroundPrimary hover:u-textWhite u-textPrimary u-cursorPointer'
                    : 'u-textLight u-cursorNotAllow u-pointerEventsNone',
                  sendButtonConfigs.className && sendButtonConfigs.className,
                )}
                style={{
                  width: 42,
                  height: 42,
                  ...sendButtonConfigs.style,
                }}
              >
                {typeof sendButtonConfigs.icon === 'function' ? (
                  sendButtonConfigs.icon()
                ) : (
                  <Icon name={sendButtonConfigs.icon} />
                )}
              </div>
            </Overlay.Trigger>
          ) : (
            <div
              {...sendButtonConfigs}
              className={classNames(
                'u-roundedMedium u-flex u-alignItemsCenter u-justifyContentCenter u-flexShrink0 u-marginLeftTiny',
                sendButtonConfigs.isActive
                  ? 'hover:u-backgroundPrimary hover:u-textWhite u-textPrimary u-cursorPointer'
                  : 'u-textLight u-cursorNotAllow u-pointerEventsNone',
                sendButtonConfigs.className && sendButtonConfigs.className,
              )}
              style={{
                width: 42,
                height: 42,
                ...sendButtonConfigs.style,
              }}
            >
              {typeof sendButtonConfigs.icon === 'function' ? (
                sendButtonConfigs.icon()
              ) : (
                <Icon name={sendButtonConfigs.icon} />
              )}
            </div>
          ))}
      </Component>
    );
  },
);

Composer.displayName = 'Composer';
Composer.defaultProps = defaultProps;
Composer.propTypes = propTypes;
export default Composer;
