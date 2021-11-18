package com.who.tobacco;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashScreenTheme);
    super.onCreate(savedInstanceState);
    PackageInfo info;
    try {
      info = getPackageManager().getPackageInfo("com.who.tobacco", PackageManager.GET_SIGNATURES);
      for (Signature signature : info.signatures) {
        MessageDigest md;
        md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        String something = new String(Base64.encode(md.digest(), 0));
        //String something = new String(Base64.encodeBytes(md.digest()));
        Log.e("hash key", something);
      }
    } catch (PackageManager.NameNotFoundException e1) {
      Log.e("name not found", e1.toString());
    } catch (NoSuchAlgorithmException e) {
      Log.e("no such an algorithm", e.toString());
    } catch (Exception e) {
      Log.e("exception", e.toString());
    }
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "WHO_App";
  }

}
