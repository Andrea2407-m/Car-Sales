import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export function Nav() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          Car Trader
        </Typography>

        <Button color="inherit">
          <Link href="/" style={{ color: 'white' }}>
              <Typography  color="inherit">
                Home
              </Typography>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/faq" style={{ color: 'white' }}>
              <Typography  color="inherit">
                FAQ
              </Typography>
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}