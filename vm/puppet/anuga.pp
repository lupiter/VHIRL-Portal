import "vgl_common"
import "epel"
import "python_pip"
import "puppi"
import "autofsck"

class {["epel", "python_pip", "vgl_common"]:}
$procplus = $physicalprocessorcount + 1


# Disable fsck on boot
class { autofsck:
  ensure => present, # default
}

class mpi {
	# Note: At the time of writing the current OpenMPI package (openmpi-devel-1.5.4-1.el6.x86_64) is missing the necessary I/O component. 
	# Parts of escript require the I/O functionality and will not work. A bug was filed with CentOS who will 
	# hopefully fix the issue in an updated package (see http://bugs.centos.org/view.php?id=5931). 
	# When that bug is fixed you should be able run yum install openmpi but until that time you will need to build from source: 
	puppi::netinstall { "openmpi":
		url => "http://www.open-mpi.org/software/ompi/v1.6/downloads/openmpi-1.6.5.tar.gz",
		extracted_dir => "openmpi-1.6.5",
		destination_dir => "/tmp",
		postextract_command => "/tmp/openmpi-1.6.5/configure --prefix=/usr/local && make -j${::procplus} all && make all install",
		require => [Class["vgl_common"]],
	}

	$mpiShContent= '# Environment for MPI
	export PATH=/usr/local/bin:$PATH
	export LD_LIBRARY_PATH=/usr/local/lib/openmpi:/usr/local/lib/:$LD_LIBRARY_PATH'
	file {"mpi-profile-env":
		path => "/etc/profile.d/mpi.sh",
		ensure => present,
		content => $mpiShContent,
		require => Puppi::Netinstall['openmpi'],
	}
}


class scientificpython {
	package { ["netcdf-devel"]:
		ensure => installed,
		require => Class["epel"],
	}
	
    puppi::netinstall { "scientificpython-inst":
        url => "https://sourcesup.renater.fr/frs/download.php/4425/ScientificPython-2.9.3.tar.gz",
		extracted_dir => "ScientificPython-2.9.3",
		destination_dir => "/tmp",		
		postextract_command => "python setup.py install",
        require => [Class["mpi"], Class["vgl_common"],],
    }
}

#Install aem specific packages...
class aem_packages {
    package { ["fftw-devel", "fftw", "openmpi", "openmpi-devel"]: 
        ensure => installed,
        require => Class["epel"],
    }
}

class pypar {
    puppi::netinstall { "pypar-inst":
        url => "https://pypar.googlecode.com/files/pypar-2.1.5_108.tgz",
		destination_dir => "/tmp",
                extracted_dir => "pypar_2.1.5_108/source",
                postextract_command => "/usr/bin/python /tmp/pypar_2.1.5_108/source/setup.py install",
        require => [Class["mpi"], Class["vgl_common"],],
    }
}
	

class {"mpi":}
class {"aem_packages": }
class {"scientificpython": }
class {"pypar": }


#Checkout, configure and install anuga
exec { "anuga-co":
    cwd => "/usr/local",
    command => "/usr/bin/svn co https://anuga.anu.edu.au/svn/anuga/trunk/anuga_core/ anuga",
    creates => "/usr/local/anuga",
    require => [Class["aem_packages"],Class["mpi"], Class["vgl_common"]],
    timeout => 0,
}

#export PYTHONPATH=/home/******/anuga_core/source

exec { "anuga-install":
    cwd => "/usr/local/anuga",
    command => "/usr/bin/python compile_all.py",
    require => Exec["anuga-co"],
    timeout => 0,
}