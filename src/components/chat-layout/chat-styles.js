import { makeStyles } from '@material-ui/core/styles';

const mainStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '90vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '73vh',
      overflowY: 'auto'
    }
  });

  export { mainStyles }