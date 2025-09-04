import { Component, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  link: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface Card {
  title: string;
  icon: string;
  menuSections: MenuSection[];
}

@Component({
  selector: 'app-sir-laminaire',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
  ],
  templateUrl: './sir-web.component.html',
  styleUrls: ['./sir-web.component.scss'],
})
export class SirLaminaireComponent {
  @ViewChild('cardDialog') cardDialogTpl!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;

  constructor(private dialog: MatDialog, private router: Router) {}

  cards: Card[] = [
    {
      title: 'CEO',
      icon: 'account_balance',
      menuSections: [
        {
          title: 'Gestión Estratégica',
          items: [
            { label: 'Análisis Financiero Empresas', link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Informes_Analisis_Competencia.aspx' },
            { label: 'Plan Estratégico', link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Plan_Estrategico.aspx' },
            { label: 'Proyectos', link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Proyectos.aspx' },
          ],
        },
        {
          title: 'Innovación',
          items: [
            { label: 'Ideas Innovadoras', link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Ideas_Innovadoras.aspx' },
            { label: 'Administrador Ideas', link: 'https://web.laminaire.net/SirWeb/D_Estrategico/Frms/Administrador_Ideas_Innovadoras.aspx' },
          ],
        },
      ],
    },
    {
      title: 'Gerencia',
      icon: 'leaderboard',
      menuSections: [
        {
          title: 'Opciones',
          items: [
            { label: 'Plan Mensual de Ejecución', link: '#' },
            { label: 'Matriz de Riesgos', link: '#' },
          ],
        },
      ],
    },
  ];

  openDialog(card: Card) {
    this.dialogRef = this.dialog.open(this.cardDialogTpl, {
      data: card,
      width: '1200px',
      maxWidth: '100vw',
      panelClass: 'custom-dialog-panel',
    });
  }

  onNavigate(url: string) {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener');
    } else {
      this.router.navigateByUrl(url);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getColumns(sections: MenuSection[], cols: number): MenuSection[][] {
    const res: MenuSection[][] = Array.from({ length: cols }, () => []);
    sections.forEach((s, i) => res[i % cols].push(s));
    return res;
  }
}
