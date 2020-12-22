import {Opinion} from "../models/survey";

export class ColorStyle {
  public static getClassBorderColor(idx: number): string {
    switch (idx) {
      case 0 :
        return 'borderBottomRejected';
      case 1 :
        return 'borderBottomBad';
      case 2 :
        return 'borderBottomNeutral';
      case 3 :
        return 'borderBottomGood';
      case 4 :
        return 'borderBottomExcellent';
      default :
        return 'borderBottomRejected';
    }
  }

  public static getColorIcon(selection: string): string {
    switch (selection) {
      case 'rejeter' :
        return 'colorRejected';
      case 'mauvais' :
        return 'colorBad';
      case 'neutre' :
        return 'colorNeutral';
      case 'bien' :
        return 'colorGood';
      case 'excellent' :
        return 'colorExcellent';
      default :
        return '';
    }
  }

  public static getColorFromScore(score: number, opinions: Opinion[]): string {
    if (score < 1) {
      return opinions[0].color;
    } else if (score < 2) {
      return opinions[1].color;
    } else if (score < 3) {
      return opinions[2].color;
    } else if (score < 4) {
      return opinions[3].color;
    } else if (score >= 4) {
      return opinions[4].color;
    }
  }
}
